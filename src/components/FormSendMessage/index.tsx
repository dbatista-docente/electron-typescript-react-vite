import { useState } from "react";
import axios from "axios";
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import ImageUpload from "../ImageUpload";

const FormSendMessage = () => {
  const [chatId, setChatId] = useState("");
  const [botToken, setBotToken] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState<[] | string[]>([]);
  const [scheduledTime, setScheduledTime] = useState("");
  const maxImages = 8; // Defina o limite de imagens por mensagem

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const messageData = {
      chatId,
      botToken,
      text: text.replace(/\n/g, "\n\t"),
      images,
      scheduledTime,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/scheduled-messages/send",
        messageData
      );
      console.log("Mensagem enviada com sucesso!", response.data);
      alert("Mensagem enviada com sucesso!");
      setImages([]);
      setText("");
      setScheduledTime("");
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
      alert("Erro ao enviar a mensagem.");
    }
  };

  return (
    <Container
      centerContent
      padding={"1rem"}
      minHeight={"85%"}
      margin={"auto"}
      width={"50%"}
      borderRadius={"2rem"}
      boxShadow={".5rem .5rem 1rem 0.5rem"}
    >
      <Heading as={"h1"} fontSize={"2.3rem"} color={"blue"}>
        Agendar Mensagem Telegram
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <FormControl id="chatId" marginBottom="4" width={"100%"}>
            <FormLabel>ID do Chat:</FormLabel>
            <Input
              padding={"1%"}
              width={"98%"}
              type="text"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              variant="filled"
            />
          </FormControl>
          <FormControl id="botToken" marginBottom="4" width={"100%"}>
            <FormLabel>Token do Bot:</FormLabel>
            <Input
              padding={"1%"}
              width={"98%"}
              type="text"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              variant="filled"
            />
          </FormControl>
          <FormControl id="text" marginBottom="4" width={"100%"}>
            <FormLabel>Texto da Mensagem:</FormLabel>
            <Textarea
              padding={"1%"}
              width={"98%"}
              value={text}
              onChange={(e) => setText(e.target.value)}
              variant="filled"
            />
          </FormControl>
          <FormControl id="scheduledTime" marginBottom="4" width={"100%"}>
            <FormLabel>Data e Hora Programadas:</FormLabel>
            <Input
              padding={"1%"}
              width={"98%"}
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              variant="filled"
            />
          </FormControl>
          <ImageUpload
            images={images}
            setImages={setImages}
            maxImages={maxImages}
          />
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            marginBottom="4"
            marginTop={"10"}
            _hover={{ backgroundColor: "blue.200" }}          >
            Enviar Mensagem
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};

export default FormSendMessage;
