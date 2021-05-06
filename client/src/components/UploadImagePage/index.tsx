import { useState } from "react";
import { Card, Form, FormLayout, TextField, Button } from "@shopify/polaris";
import ImageUploader from "react-images-upload";

const UploadImagePage = () => {
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("");
  const onDrop = (files: File[], pictures: string[]) => {
    // Set the most recent picture
    setPicture(pictures.pop() || "");
  };
  const handleNameChange = (name: string) => {
    setName(name);
  };
  const handlePriceChange = (price: string) => {
    setPrice(price);
  };
  const handleSave = () => {
    // Upload image and price to backend
    fetch("/api/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ picture: { name, encoding: picture }, price }),
    });
  };
  return (
    <Card title="Upload an image to sell!" sectioned>
      <ImageUploader
        withIcon={true}
        buttonText={
          picture.length === 0 ? "Choose images" : "Choose another image"
        }
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
      <div style={{ textAlign: "center" }}>
        <img src={picture} style={{ maxWidth: "100%" }} />
      </div>
      {picture.length > 0 && (
        <Form onSubmit={handleSave}>
          <FormLayout>
            <TextField
              value={name}
              onChange={handleNameChange}
              label="Name"
              type="text"
              helpText={<span>Choose a name for your image.</span>}
            />
            <TextField
              value={price}
              onChange={handlePriceChange}
              label="Price"
              type="number"
              helpText={<span>Choose a price to sell your image.</span>}
            />
            <Button submit disabled={price.length === 0 || name.length === 0}>
              Save
            </Button>
          </FormLayout>
        </Form>
      )}
    </Card>
  );
};
export default UploadImagePage;
