import React from 'react';
import { NextPageContext } from 'next';

interface Props {
  stars?: number;
  host?: string;
}

class Star extends React.Component<Props> {
  static async getInitialProps(ctx: NextPageContext) {
    const { req, query } = ctx;
    let host;
    if (req) {
      host = req.headers.host; // will give you localhost:3000
    } else {
      host = location.hostname;
    }
    console.log('host', host, query);
    const res = await fetch(`${process.env.API_BASE_URL}/repos/vercel/next.js`)//https://api.github.com
    console.log(res, 'res');
    const json = await res.json()
    return { stars: json.stargazers_count, host }
  }

  render() {
    console.log(this.props)
    return (
      <>
        <div>Next stars: {this.props.stars}</div>
        <div>Host: {this.props.host}</div>
      </>
    )
  }
}
export default Star