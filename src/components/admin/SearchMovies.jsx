import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import { searchMovieForAdmin } from '../../api/movie';
import { useNotification } from '../../hooks';
import MovieListItem from '../MovieListItem';
import NotFoundText from '../NotFoundText';


export default function SearchMovies() {

    const [movies, setMovies] = useState([]);
    const [resultNotFound, setResultNotFound] = useState(false)

    const [searchParams] = useSearchParams();
    const { updateNotification } = useNotification()

    console.log(searchParams.get("title"));

    const query = searchParams.get("title");

    const searchMovies = async (val) => {
        //call the backend api
        console.log(val)
        const {error, results} = await searchMovieForAdmin(val)

        if(error) return updateNotification('error', error)

        if(!results.length){
            setResultNotFound(true);
            return setMovies([])
        }

        setResultNotFound(false);
        console.log(results)
        setMovies([...results]);
    }

    const handleAfterDelete = (movie) => {
        const updatedMovies = movies.filter((m) => {
            if(m.id !== movie.id) return m;
        })
        setMovies([...updatedMovies])

    }

    const handleAfterUpdate = (movie) => {
        const updatedMovies = movies.map((m) => {
            if(m.id === movie.id) return movie;

            return m;
        })
        setMovies([...updatedMovies])
    }


    useEffect(() => {
        if(query.trim()) searchMovies(query)
    }, [query]) 

  return (
    <div className='p-5 space-y-3'>
            <NotFoundText text='Record not found!' visible={resultNotFound} />
        {!resultNotFound && movies.map((movie) => {
             return <MovieListItem 
             movie={movie} key={movie.id}
             afterDelete = {handleAfterDelete}
             afterUpdate = {handleAfterUpdate}
             />
        })}
    </div>
  )
}
