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
  Img,
  Flex,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import ImageUpload from "../ImageUpload";
//@ts-ignore
import paperPlane from "../../public/images/paper-plane.png";
//@ts-ignore
import robot from "../../public/images/robot.png";
//@ts-ignore
import historical from "../../public/images/historical.png";

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
    <Flex flexDirection={"row-reverse"} justifyContent={"center"} gap={"3rem"}>
      <Container
        centerContent
        padding={"1rem"}
        minHeight={"100%"}
        // margin={"auto"}
        borderRadius={"2rem"}
        boxShadow={".5rem .5rem 1rem 0.5rem"}
        backgroundColor={"white"}
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
                borderRadius={"1rem"}
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
                borderRadius={"1rem"}
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
                borderRadius={"1rem"}
                border={"2px solid black"}
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
                borderRadius={"1rem"}
                fontFamily={"MinhaFonte"}
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
              _hover={{ backgroundColor: "blue.200" }}
              border={"none"}
              padding={"1rem"}
              borderRadius={"2rem"}
              backgroundColor={"blue"}
              color={"white"}
              fontFamily={"MinhaFonte"}
              fontSize={"1.3rem"}
            >
              Enviar Mensagem
            </Button>
          </FormControl>
        </form>
      </Container>
      <Flex flexDirection={"column"} justifyContent={"space-evenly"}>
        <Img src={paperPlane} width={"3rem"}></Img>
        <Img src={robot} width={"3rem"}></Img>
        <Img src={historical} width={"3rem"}></Img>
      </Flex>
    </Flex>
  );
};

export default FormSendMessage;
