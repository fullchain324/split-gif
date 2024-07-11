# What's this?

The `Animated GIF Grid Splitter` project is the web application that takes an animated GIF as input, splits it into a grid of smaller animated GIFs, and displays them in a synchronized manner on an HTML page.

## Requirements

1. GIF Processing:
   - Implement a function to split an input animated GIF into an N x M grid of smaller animated GIFs.
   - Ensure each resulting small GIF maintains its animation.

2. Web Interface:
   - Create an HTML page to display the processed GIFs.
   - Arrange the smaller GIFs in a grid layout matching the original split.

3. Synchronization:
   - Ensure all small GIFs are frame-synchronized, playing in unison to recreate the original animation effect.

4. Color Preservation:
   - Maintain the original colors of the GIF throughout the splitting and display process.

5. User Input:
   - Allow users to upload their own animated GIF.
   - Provide options for users to specify the grid dimensions (N x M).

6. Performance:
   - Optimize the application to handle GIFs of various sizes efficiently.


The project is a `create-react-app`, which only renders views and handles events

# Getting Started

### Prerequisites

No Prerequisites

## Installation

### npm install

`npm install` should work now.

### run webcli

`npm start` should work now.

## Brief Explanation

### approach

I have decided to fully implement the processing of GIF files on the frontend using the `wasm-imagemagick` library, rather than creating a backend server.

### challenges

Since this is a small task, I don't anticipate any significant challenges in implementing this assessment
