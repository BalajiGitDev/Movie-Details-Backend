import express from "express";
import { auth } from "../middleware/auth.js";
import {
    getMovies,
    getMovieById,
    createMovie,
    deleteMovieById,
    updateMovieById,
} from "../services/movies.service.js";

const router = express.Router();

router.get("/", async function (request, response) {
    // console.log(request.query)

    if (request.query.rating) {
        request.query.rating = +request.query.rating;
    }

    const movies = await getMovies(request);
    console.log(movies)
    response.send(movies);
});

router.get("/:id", async function (request, response) {
    const { id } = request.params;

    const movie = await getMovieById(id);

    console.log(movie);
    movie
        ? response.send(movie)
        : response.status(404).send({ message: "Movie Not Found" })
});

router.post("/", async function (request, response) {
    const data = request.body;
    console.log(data);

    const result = await createMovie(data);

    response.send(result)

});

router.delete("/:id", async function (request, response) {
    const { id } = request.params;

    const result = await deleteMovieById(id);

    console.log(result);
    result
        ? response.send({ message: "movie deleted successfully" })
        : response.status(404).send({ message: "Movie Not Found" })
});

router.put("/:id", async function (request, response) {
    const { id } = request.params;
    const data = request.body;

    const result = await updateMovieById(id, data);

    console.log(result);
    response.send(result)
});

export default router;