import React from 'react';
import { useParams } from 'react-router';
import MovieStore from '../store/MovieStore';

export default function MoviePage() {
  const { id } = useParams();

  return <div>MoviePage</div>;
}
