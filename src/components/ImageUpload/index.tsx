import {
  Text,
  Flex,
  Box,
  FormControl,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
import Dropzone from "react-dropzone";

interface ImageUploadProps {
  images: any;
  setImages: any;
  maxImages: any;
}

const ImageUpload = ({ images, setImages, maxImages }: ImageUploadProps) => {
  const handleImageDrop = (acceptedFiles: Blob[]) => {
    if (images.length + acceptedFiles.length > maxImages) {
      alert(`Limite máximo de ${maxImages} imagens por mensagem atingido.`);
      return;
    }

    const imagePromises = acceptedFiles.map((file: Blob) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(String(reader.result));
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((imageBase64Data) => {
      setImages([...images, ...imageBase64Data]);
    });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <FormControl id="images">
      <Flex
        borderStyle="dotted"
        borderRadius={"10px"}
        padding={"0.3%"}
        color={"gray"}
        height={"3%"}
        cursor={"pointer"}
      >
        <Dropzone onDrop={handleImageDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <Text color={"gray"} align={"center"}>
                Arraste e solte algumas imagens aqui ou clique para selecionar.
              </Text>
            </div>
          )}
        </Dropzone>
      </Flex>
      <FormLabel>Imagens Selecionadas:</FormLabel>
      <Flex className="selected-images" justifyContent={"center"} alignItems={"center"} flexWrap="wrap">
        {images.map((image: string, index: number) => (
          <Box
            key={index}
            className="image-thumbnail"
            marginRight="4"
            marginBottom="4"
          >
            <img src={image} alt={`Thumbnail ${index}`} width="100px" />
            <IconButton
              icon={<SmallCloseIcon />}
              size="sm"
              variant="ghost"
              color="red"
              aria-label="Remover imagem"
              onClick={() => handleRemoveImage(index)}
            />
          </Box>
        ))}
      </Flex>
    </FormControl>
  );
};

export default ImageUpload;
