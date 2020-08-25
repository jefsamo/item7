import axios from "axios";

export class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios({
        method: "GET",
        url: `http://127.0.0.1:3000/api/v1/products?category=${this.query}`,
      });
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
}
