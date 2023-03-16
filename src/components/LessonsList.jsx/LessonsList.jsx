import { useGetAllCoursesQuery } from "../../redux/lessonsSlice";
import { NavLink } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  ListItem,
  ListItemText,
  List,
  Divider,
  Stack,
  Rating,
  //Button,
  Box,
  Pagination,
} from "@mui/material";
import { useState } from "react";
import { Loader } from "../Loader/Loader";

export const LessonsList = () => {
  const {
    data = [],
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetAllCoursesQuery();
  /* console.log(data.courses); */

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const pagesCount = Math.round(data?.courses?.length / 10);
  const contentPerPage = 10;
  const lastContentIndex = page * contentPerPage;

  const firstContentIndex = lastContentIndex - contentPerPage;

  return (
    <>
      {isLoading && (
        <Grid container spacing={2} justifyContent="center">
          <Loader />
        </Grid>
      )}
      <Grid container spacing={2} justifyContent="center">
        {data?.courses && (
          <Pagination
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "center",
            }}
            count={pagesCount}
            shape="rounded"
            color="success"
            //variant="outlined"
            page={page}
            onChange={handleChange}
          />
        )}
      </Grid>
      <Grid container spacing={2}>
        {data?.courses
          ?.slice(firstContentIndex, lastContentIndex)
          .map((lesson, index) => (
            <Grid item xs={12} sm={6} md={4} key={lesson.id}>
              <NavLink className="read-more" to={lesson.id}>
                <Card
                  sx={{
                    m: 2,
                    backgroundColor: "rgba(255, 255, 255, .65)",
                    backdropFilter: "blur(15px)",
                    border: "1px solid rgba(255, 255, 255, .25)",
                    borderRadius: "10px",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={lesson.previewImageLink + "/cover.webp"}
                      alt={lesson.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h25" component="h2">
                        {lesson.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        Lessons: {lesson.lessonsCount}
                      </Typography>
                      {lesson?.meta?.skills && (
                        <List>
                          <Typography variant="h5" color="text.secondary">
                            Skills:
                          </Typography>
                          {lesson?.meta?.skills?.map((skill, index) => (
                            <ListItem key={index} component="li" disablePadding>
                              &#9734;
                              <ListItemText primary={skill} />
                            </ListItem>
                          ))}
                        </List>
                      )}
                      <Divider />
                      <Stack spacing={1} sx={{ flexDirection: "row" }}>
                        <Rating
                          name="half-rating-read"
                          value={lesson.rating}
                          precision={0.1}
                          readOnly
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          pl={2}
                        >
                          [{lesson.rating}]
                        </Typography>
                      </Stack>
                      <Box direction="row" spacing={2}>
                        {/*             <Button variant="contained" color="secondary"> */}
                        {lesson.tags[0]}
                        {/*     </Button> */}
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </NavLink>
            </Grid>
          ))}
      </Grid>
    </>
  );
};
