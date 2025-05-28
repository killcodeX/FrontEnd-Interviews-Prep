const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const { cricketCommentary } = require("./data");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const requestPath = parsedUrl.pathname;
  const method = req.method;

  // Set CORS headers to allow cross-origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (method === "GET" && path === "/") {
    // Home route
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <h1>Welcome to the Server!</h1>
      <p>Available endpoints:</p>
      <ul>
        <li><a href="/api/events">/api/events</a> - Get cricket commentary</li>
        <li><a href="/test-client">/test-client</a> - Test SSE client</li>
      </ul>
    `);
  } else if (method === "GET" && requestPath === "/api/events") {
    // Server-Sent Events endpoint
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });

    let index = 0;

    // Send initial message
    res.write(`data: ${cricketCommentary[index]}\n\n`);
    index++;

    // Set up interval to send messages every 2 seconds
    const interval = setInterval(() => {
      if (index < cricketCommentary.length) {
        res.write(`data: ${cricketCommentary[index]}\n\n`);
        index++;
      } else {
        // All messages sent, send completion message and close
        res.write(
          `data: {"type": "complete", "message": "End of cricket commentary"}\n\n`
        );
        clearInterval(interval);
        res.end();
      }
    }, 2000); // Send every 2 seconds

    // Clean up when client disconnects
    req.on("close", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });

    req.on("error", () => {
      console.log("Client connection error");
      clearInterval(interval);
    });
  } else if (method === "GET" && requestPath === "/test-client") {
    // Serve HTML file
    const filePath = path.join(__dirname, "test-client.html");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading HTML file:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading test client page");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    // 404 Not Found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found");
  }
});

const port = 8000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
  console.log(`Try these endpoints:`);
  console.log(`- http://${host}:${port}/`);
  console.log(`- http://${host}:${port}/api/events`);
  console.log(`- http://${host}:${port}/test-client`);
});
