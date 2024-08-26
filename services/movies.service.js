import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function updateMovieById(id, data) {
    return await client
        .db('MVD')
        .collection('movies')
        .updateOne({ _id: ObjectId(id) }, { $set: data });
}

export async function deleteMovieById(id) {
    return await client
        .db('MVD')
        .collection('movies')
        .deleteOne({ _id: ObjectId(id) });
}

export async function createMovie(data) {
    return await client
        .db('MVD')
        .collection('movies')
        .insertMany(data);
}

export async function getMovieById(id) {
    return await client
        .db('MVD')
        .collection('movies')
        .findOne({ _id: ObjectId(id) });
}

export async function getMovies(request) {
    return await client
        .db('MVD')
        .collection('movies')
        .find(request.query)
        .toArray();
}