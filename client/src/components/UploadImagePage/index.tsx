import { useState } from "react";
import {
  Card,
  Form,
  FormLayout,
  TextField,
  Button,
  Toast,
  Frame,
} from "@shopify/polaris";
import ImageUploader from "react-images-upload";

const UploadImagePage = () => {
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [username, setUsername] = useState("");
  const [toastActive, setToastActive] = useState(false);
  const onDrop = (_: File[], pictures: string[]) => {
    // Set the most recent picture
    setPicture(pictures.pop() || "");
  };
  const handleNameChange = (name: string) => {
    setName(name);
  };
  const handlePriceChange = (price: string) => {
    setPrice(price);
  };
  const handleUsernameChange = (username: string) => {
    setUsername(username);
  };
  const handleSave = async () => {
    // Upload image and price to backend
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        picture: { name, encoding: picture },
        price,
        username,
      }),
    });
    const imageObject = await response.json();
    if (imageObject.image) {
      // Trigger success toast
      setToastActive(true);
      // Remove existing image from state
      setPicture("");
      setName("");
      setPrice("");
      setUsername("");
    }
  };
  const toggleActive = () => {
    setToastActive((active) => !active);
  };
  const saveSuccessToast = toastActive ? (
    <Toast
      content="Successfully saved image!"
      onDismiss={toggleActive}
      duration={2000}
    />
  ) : null;
  return (
    <Frame>
      <br />
      <Card title="Upload an image to sell" sectioned>
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
                value={username}
                onChange={handleUsernameChange}
                label="Username"
                type="text"
                helpText={
                  <span>
                    Enter in your username. You will need this to sell your
                    image!
                  </span>
                }
              />
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
              <Button
                submit
                disabled={
                  price.length === 0 ||
                  name.length === 0 ||
                  username.length === 0
                }
              >
                Save
              </Button>
            </FormLayout>
          </Form>
        )}
      </Card>
      {saveSuccessToast}
    </Frame>
  );
};
export default UploadImagePage;
