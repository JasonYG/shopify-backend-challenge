# shopify-backend-challenge

**DEMO:** https://jason-shopify-backend.herokuapp.com/

## App Instructions
ImageHub is a proof-of-concept image repository that allows users to upload, sell, and purchase other images.

1. To upload an image, navigate to the upload page, and click on the "Choose Images" button. 
2. After uploading an image, choose a username for this image to be associated with. Note that you will need this username to sell the image later!
3. Choose a name and price for the image
4. To sell the image, navigate to the sell page and enter the same username you used when uploading the image.
5. After putting the image for sale, navigate to the buy page. You will see your own image, along with images that other people have put up!

## Dev Instructions
1. Clone the repository with `git clone https://github.com/JasonYG/shopify-backend-challenge.git`
2. `cd` into the repository and install the dependencies with `npm install`
3. Note: you will need environment variables, `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET`, and `MONGO_URI`. The first four are obtained from AWS S3, and the last should point to your MongoDB.

## Testing Instructions
1. Make sure the app is running first by running `npm run dev`. Allow the frontend and backend to load properly.
2. Next, run `npm run test`. You should see a mock chrome tab open that runs the Puppeteer + Jest tests!

## Technical Details
This app was written with a Node.js + Express backend, and a React frontend. 

I used MongoDB as my database of choice, and used AWS S3 to house the images uploaded by users.
