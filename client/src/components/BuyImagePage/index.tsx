import { useState, useEffect } from "react";
import { Card, Toast, Frame, MediaCard, Banner } from "@shopify/polaris";

const BuyImagePage = () => {
  const [successToastActive, setSuccessToastActive] = useState(false);
  const [images, setImages] = useState<any[]>([]);

  // Fetch items for sale
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/selling-images");
      const { images } = await response.json();
      setImages(images);
    })();
  }, []);

  const toggleSuccessActive = () => {
    setSuccessToastActive((active) => !active);
  };
  const handleBuyImage = async (image: any) => {
    const response = await fetch(`/api/buy-image`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageId: image._id,
      }),
    });
    const { image: returnImage } = await response.json();
    if (returnImage) {
      // Remove return image from displayed images
      setImages(images.filter((image) => image._id !== returnImage._id));
      toggleSuccessActive();
    }
  };

  const successToast = successToastActive ? (
    <Toast
      content="Successfully purchased!"
      onDismiss={toggleSuccessActive}
      duration={2000}
    />
  ) : null;

  return (
    <Frame>
      <br />
      <Card title="Buy an image" sectioned />
      {images.length === 0 ? (
        <>
          <br />
          <Banner title="No images for sale" status="warning">
            <p>
              Currently, there are no images for sale. Try uploading an image
              and selling it to see it here!
            </p>
          </Banner>
        </>
      ) : (
        images.map((image) => {
          const { name, price, s3Url, username } = image;
          return (
            <MediaCard
              title={`${name}, by ${username}`}
              description={`Price: $${price}`}
              key={name}
              portrait
              primaryAction={{
                content: "Buy this image",
                onAction: () => handleBuyImage(image),
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
        })
      )}
      {successToast}
    </Frame>
  );
};
export default BuyImagePage;
