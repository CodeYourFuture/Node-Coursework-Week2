<html lang="en">
  <head>
    <title>Welcome to CYF Chat</title>
  </head>
  <body>
    <h1>
      CYF Chat
    </h1>
    <h2>
      Send a message
    </h2>
    <form action="/messages" method="post">
      <p>
        Name: <input type="text" name="from" placeholder="Your Name" /> <br />
        Message: <input type="text" name="text" placeholder="The message..." />
        <br />
      </p>
      <button type="submit">
        Send
      </button>
    </form>

    <a href="/messages">See all messages</a>
  </body>
</html>
