# Fortnite WebSocket Client

## Overview

The Fortnite WebSocket Client is a JavaScript application that demonstrates how to interact with Fortnite's matchmaking WebSocket service to receive game session updates. This application covers the entire process, from obtaining an access token to connecting to the WebSocket service.

## Prerequisites

Before running the application, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [axios](https://www.npmjs.com/package/axios) (HTTP client for making requests)
- [crypto](https://nodejs.org/api/crypto.html) (Node.js crypto library)
- [ws](https://www.npmjs.com/package/ws) (WebSocket library)

You can install the required npm packages using the following command:

```bash
npm install axios crypto ws
```
## Usage
1. Clone the repository to your local machine:
```bash
git clone https://github.com/2M4U/fortnite-websocket-client.git
```
2. Navigate to the project directory:
```bash
cd fortnite-websocket-client
```
3. Open the `index.js` file in a text editor and configure the following variables:

- `debug`: Set this to `true` for debugging purposes.
- `solo`: Specify the desired playlist or set it to `playlist_playgroundv2`.
- `exchangeCode`: Input your Exchange Code here.

4. Run the application:
```bash
node index.js
```
5. The application will perform the following steps:
- Obtain an access token.
- Retrieve the NetCL value.
- Generate a ticket.
- Calculate the checksum.
- Connect to the Fortnite matchmaking WebSocket service.
- Display received data from the WebSocket.

## Contributing
Contributions to this project are welcome. You can contribute by:

- Opening issues for bug reports or feature requests.
- Submitting pull requests with improvements or fixes.
Please ensure that your code follows the project's coding standards and includes relevant tests.

# License
This project is licensed under the GNU Public License. See the [LICENSE](./LICENSE) file for details.

## Credits

### Contributors
- [2M4U](https://github.com/2M4U) - Project Lead
- [Eldor](https://github.com/3ldor/mms-checksum-poc/) - Reverse Engineering
- [YLS-Dev](https://github.com/YLSDev/Fortnite-Matchmaker/) - Python

### External Libraries and Resources
- [Axios](https://github.com/axios/axios) - Used for making HTTP requests.
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) - JavaScript WebSocket API.
- [Epic Games](https://www.epicgames.com/site/en-US/home) - For providing official APIs and services.

### Special Thanks
- Special thanks to the [EpicGames App Development](https://discord.gg/TbrCXNQuz7) community,
- [YLS-Dev](https://github.com/YLSDev/).
- [Eldor](https://github.com/3ldor/)

If you've contributed to this project or if you've used external libraries and resources, make sure to include them in the "Credits" section.
It's a way to acknowledge the efforts of contributors and give credit to the resources that have been utilized.


# **Ban Disclaimer:**

This project interacts with Fortnite's matchmaking and game session services using official APIs provided by Epic Games. However, please be aware that any unauthorized or excessive use of these APIs can potentially violate Epic Games' Terms of Service. While efforts have been made to ensure that this project follows best practices and respects Epic Games' policies, there is always a risk associated with using third-party tools and services.

**I am not responsible for any consequences that may arise from using this project, including but not limited to:**
- Temporary or permanent bans from Fortnite.
- Loss of in-game items or progress.
- Restrictions on your Epic Games account.

It is crucial to use this project responsibly and in moderation. Ensure that you are in compliance with Epic Games' policies and terms of service. Use at your own discretion, and be aware of the potential risks involved. By using this project, you acknowledge that you understand these risks and accept responsibility for any consequences that may occur.
