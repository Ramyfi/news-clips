"use client";

import { Box, styled } from "@mui/material";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";

const Container = styled(Box)(({ theme }) => ({
  width: "80%",
  margin: "110px auto 0 auto",
  [theme.breakpoints.down("md")]: {
    width: "75%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "85%",
  },
}));

const Article = styled(Card)`
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  margin-bottom: 20px;
`;

const ArticleContent = styled(CardContent)`
  display: flex;
  padding: 8px;
  padding-bottom: 4px !important;
`;

const Image = styled("img")({
  height: 268,
  width: "88%",
  borderRadius: 5,
  objectFit: "cover",
});

const ContectContainer = styled(Grid)(({ theme }) => ({
  margin: "5px 0px 0 -25px",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.between("sm", "lg")]: {
    padding: "0 5px",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "5px 0",
  },
}));

const Title = styled(Typography)`
  font-weight: 300;
  color: black;
  font-size: 22px;
  line-height: 27px;
`;

const Author = styled(Typography)`
  color: #808290;
  font-size: 12px;
  line-height: 22px;
`;

const Summary = styled(Typography)`
  line-height: 20px;
  color: #44444d;
  margin-top: 5px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const Short = styled("b")({
  color: "#44444d",
  fontFamily: "'Convergence', sans-serif",
});

const ReadMore = styled(Typography)`
  font-size: 12px;
  margin-top: auto;
  margin-bottom: 10px;
  '& > *': {
      textDecoration: 'none',
      color: '#000',
      fontWeight: 900
  }
`;

const Loading = styled(CircularProgress)`
  position: fixed;
  left: 50%;
  top: 50%;
`;

const LoadingArticles = styled(Typography)`
  font-size: 30px;
  position: absolute;
  top: 56%;
  left: 48%;
  font-family: "sans-serif";
`;

export async function getSummary() {
  const response = await fetch("http://127.0.0.1:5328/api/summary");
  const data = await response.json();
  return data;
}

export default function Home() {
  const [articleData, setArticleData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      const data = await getSummary();
      setArticleData(data);
      setLoading(false);
    }, 1000);
  }, []);

  if (isLoading)
    return (
      <LoadingArticles>
        <Loading color="inherit" />
        Loading...
      </LoadingArticles>
    );
  if (!articleData) return <p>Article Not Available</p>;

  return (
    <Box>
      <Container>
        {articleData.articles.map((article) => (
          <Article key={article.title}>
            <ArticleContent>
              <Grid container spacing={1}>
                <Grid lg={4} md={4} sm={4} xs={12} item>
                  <Image src={article.urlToImage} />
                </Grid>

                <ContectContainer lg={8} md={8} sm={8} xs={12} item>
                  <Title>{article.title}</Title>
                  <Author>
                    <Short>news clip</Short> by {article.author}, Published at:{" "}
                    {article.publishedAt}
                  </Author>
                  <Summary>{article.summary}</Summary>
                  <ReadMore>
                    read more at{" "}
                    <a href={article.url} target="_blank">
                      {article.url}
                    </a>
                  </ReadMore>
                </ContectContainer>
              </Grid>
            </ArticleContent>
          </Article>
        ))}
      </Container>
    </Box>
  );
}

//   /*
//   {
//     "source": {
//         "id": null,
//         "name": "ReadWrite"
//     },
//     "author": "Radek Zielinski",
//     "title": "GBTC Bitcoin ETF holdings drop before halving",
//     "description": "The Grayscale Bitcoin Trust (GBTC), a prominent Bitcoin investment product, has seen a significant decline in its Bitcoin (BTC) holdings.… Continue reading GBTC Bitcoin ETF holdings drop before halving\nThe post GBTC Bitcoin ETF holdings drop before halving ap…",
//     "url": "https://readwrite.com/gbtc-bitcoin-etf-holdings-drop-before-halving/",
//     "urlToImage": "https://readwrite.com/wp-content/uploads/2024/04/zxDgyfq8QYCzJhRAH2CF1g.jpg",
//     "publishedAt": "2024-04-17T16:43:29Z",
//     "content": "The Grayscale Bitcoin Trust (GBTC), a prominent Bitcoin investment product, has seen a significant decline in its Bitcoin (BTC) holdings. This is despite the outflows recently slowing down.\r\nAccordin… [+2125 chars]"
// }
//   */
