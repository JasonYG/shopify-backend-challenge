import { useState } from "react";
import {
  Card,
  Form,
  FormLayout,
  TextField,
  Button,
  Toast,
  Frame,
  MediaCard,
  Modal,
} from "@shopify/polaris";
import ImageUploader from "react-images-upload";

const SellImagePage = () => {
  const [username, setUsername] = useState("");
  const [toastActive, setToastActive] = useState(false);
  const [successToastActive, setSuccessToastActive] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [currentImage, setCurrentImage] = useState({
    name: "",
    username: "",
    price: "",
    s3Url: "",
  });
  const [updatedPrice, setUpdatedPrice] = useState("");
  const handleUsernameChange = (username: string) => {
    setUsername(username);
  };
  const handleSubmit = async () => {
    // Fetch images that belong to that username
    const response = await fetch(`/api/images/${username}`);
    const { images } = await response.json();
    if (images.length === 0) {
      setToastActive(true);
    } else {
      setImages(images);
    }
  };
  const toggleActive = () => {
    setToastActive((active) => !active);
  };
  const toggleSuccessActive = () => {
    setSuccessToastActive((active) => !active);
  };
  const toggleDisplayModal = () => {
    setDisplayModal((displayModal) => !displayModal);
  };
  const handleUpdatePrice = (updatedPrice: string) => {
    setUpdatedPrice(updatedPrice);
  };
  const handleSubmitChangePrice = async () => {
    const response = await fetch("/api/update-price", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: currentImage.name,
        username: currentImage.username,
        updatedPrice,
      }),
    });
    const { image: updatedImage } = await response.json();
    const updatedImages = images.map((image: any) => {
      if (
        image.name === updatedImage.name &&
        image.username === updatedImage.username
      ) {
        return updatedImage;
      } else {
        return image;
      }
    });
    setImages(updatedImages);
    toggleSuccessActive();
    toggleDisplayModal();
  };
  const noImagesToast = toastActive ? (
    <Toast
      content="No images found by that username :("
      onDismiss={toggleActive}
      duration={2000}
    />
  ) : null;
  const successToast = successToastActive ? (
    <Toast
      content="Successfully changed price!"
      onDismiss={toggleSuccessActive}
      duration={2000}
    />
  ) : null;
  return (
    <Frame>
      <br />
      <Modal
        open={displayModal}
        onClose={toggleDisplayModal}
        title={`Change price of ${currentImage?.name}`}
      >
        <Modal.Section>
          <Form onSubmit={handleSubmitChangePrice}>
            <FormLayout>
              <TextField
                value={updatedPrice}
                onChange={handleUpdatePrice}
                label="Price"
                type="number"
                helpText={<span>Enter in the updated price.</span>}
              />
              <Button submit disabled={updatedPrice.length === 0}>
                Enter
              </Button>
            </FormLayout>
          </Form>
        </Modal.Section>
      </Modal>
      <Card title="Sell your images" sectioned>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={username}
              onChange={handleUsernameChange}
              label="Username"
              type="text"
              helpText={
                <span>
                  Enter in the same username you chose when uploading your
                  image.
                </span>
              }
            />
            <Button submit disabled={username.length === 0}>
              Enter
            </Button>
          </FormLayout>
        </Form>
      </Card>
      {images.map((image) => {
        const { name, price, s3Url } = image;
        return (
          <MediaCard
            title={name}
            description={`Price: $${price}`}
            key={name}
            portrait
            primaryAction={{
              content: "Sell this image",
              onAction: () => {},
            }}
            secondaryAction={{
              content: "Change price",
              onAction: async () => {
                setCurrentImage(image);
                toggleDisplayModal();
              },
            }}
          >
            <img
              src={s3Url}
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            ></img>
          </MediaCard>
        );
      })}
      {noImagesToast}
      {successToast}
    </Frame>
  );
};
export default SellImagePage;
