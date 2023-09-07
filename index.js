const axios = require('axios');
const crypto = require('crypto');
const WebSocket = require('ws');

class FortniteWebSocket {
  constructor() {
    this.debug = true;
    this.Bearer = null;
    this.accountId = null;
  }

  async getUserAgent() {
    try {
      const tokenResponse = await this.getToken();
      const buildVersion = tokenResponse.elements[0].buildVersion.slice(0, -8);
      return `Fortnite/${buildVersion} Windows/10`;
    } catch (error) {
      console.error('Failed to get user agent:', error);
      return null;
    }
  }

  async getNetCL(bearer) {
    try {
      const url = 'https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/matchmaking/session/matchMakingRequest';
      const payload = JSON.stringify({
        criteria: [],
        openPlayersRequired: 1,
        buildUniqueId: '',
        maxResults: 1,
      });
      const headers = {
        Authorization: `Bearer ${bearer}`,
        'Content-Type': 'application/json',
      };
      const response = await axios.post(url, payload, { headers });
      return response.data[0].attributes.buildUniqueId_s;
    } catch (error) {
      console.error('Failed to get NetCL:', error);
      return null;
    }
  }

  async generateTicket(bearer, solo) {
    try {
      const url = `https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/matchmakingservice/ticket/player/${this.accountId}?partyPlayerIds=${this.accountId}&bucketId=FN:Stage:${this.netcl}:2:ME:${solo}:PC:private:0&player.platform=Windows&player.subregions=SAO&player.option.preserveSquad=false&player.option.crossplayOptOut=false&player.option.partyId=FooPartyId&player.option.splitScreen=false&party.WIN=true&input.KBM=true&player.input=KBM&player.option.microphoneEnabled=true&player.option.uiLanguage=pt-BR`;
      const headers = {
        'User-Agent': await this.getUserAgent(),
        Authorization: `Bearer ${bearer}`,
      };
      const response = await axios.get(url, { headers });
      const payload = response.data.payload;
      const signature = response.data.signature;
      return { payload, signature };
    } catch (error) {
      console.error('Failed to generate ticket:', error);
      return null;
    }
  }

  calcChecksum(ticketPayload, signature) {
    const plaintext = ticketPayload.slice(10, 20) + "Don'tMessWithMMS" + signature.slice(2, 10);
    const data = Buffer.from(plaintext, 'utf16le');
    const sha1 = crypto.createHash('sha1').update(data).digest();
    const checksum = sha1.slice(2, 10).toString('hex').toUpperCase();
    return checksum;
  }

  async sendWebSocketRequest(payload, signature, checksum) {
    const headers = {
      Authorization: `Epic-Signed mms-player ${payload} ${signature} ${checksum}`,
    };

    const ws = new WebSocket('wss://fortnite-matchmaking-public-service-live-me.ol.epicgames.com:443', { headers });

    ws.on('open', () => {
      console.log('WebSocket connection opened');
    });

    ws.on('message', (data) => {
      console.log(`Received: ${data}`);
      // Handle received data here
    });

    ws.on('close', (code, reason) => {
      console.log(`WebSocket connection closed with code ${code}: ${reason}`);
    });

    ws.on('error', (error) => {
      console.error(`WebSocket error: ${error.message}`);
    });
  }

  async getToken() {
    const exchangeCode = prompt('Insert your Exchange Code here: ');

    const tokenUrl = 'https://account-public-service-prod.ol.epicgames.com/account/api/oauth/token';
    const tokenPayload = `grant_type=exchange_code&exchange_code=${exchangeCode}`;
    const tokenHeaders = {
      Authorization: 'Basic MzQ0NmNkNzI2OTRjNGE0NDg1ZDgxYjc3YWRiYjIxNDE6OTIwOWQ0YTVlMjVhNDU3ZmI5YjA3NDg9ZDMxM2I0MWE=',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const response = await axios.post(tokenUrl, tokenPayload, { headers: tokenHeaders });
      this.Bearer = response.data.access_token;
      this.accountId = response.data.account_id;
      return response;
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  }

  async main() {
    const solo = this.debug ? 'playlist_playgroundv2' : 'playlist_defaultsolo';
    try {
      this.netcl = await this.getNetCL(this.Bearer);
      const { payload, signature } = await this.generateTicket(this.Bearer, solo);
      const checksum = this.calcChecksum(payload, signature);

      console.log('Connecting to WebSocket');
      await this.sendWebSocketRequest(payload, signature, checksum);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}

// Create an instance of FortniteWebSocket and start the process
const fortniteWebSocket = new FortniteWebSocket();
fortniteWebSocket.main();
