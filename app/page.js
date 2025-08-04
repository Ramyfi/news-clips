"use client";

// This component is where the content of the news articles is rendered. Natasha Machado

import { Box, styled } from "@mui/material"; //Using material-ui to build cards, boxes, containers in UI
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";

import { useState, useEffect } from "react";

//Using Styled Components to overrride the material UI components wherever necessary.

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

export async function getSummary() { // To fetch the modified response with summarized articles in json() format
  const response = await fetch("http://https://backendfornewsclips.onrender.com/api/summary");
  const data = await response.json();
  return data;
}

export default function Home() {
  const [articleData, setArticleData] = useState(null); //to set and update articles
  const [isLoading, setLoading] = useState(true); //for rendering loading icon when data is still being fetched

  useEffect(() => { // executes the functions on page load
    setTimeout(async () => {
      const data = await getSummary();  // calling the summarization function
      setArticleData(data); //updating the fetched data
      setLoading(false); //removing loading icon once data is available
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

  //  Displaying article details in a sequential grid format
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
