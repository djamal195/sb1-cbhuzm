import React from 'react';
import { MoreVertical, Play, Clock } from 'lucide-react';

export function MovieList() {
  const movies = [
    {
      id: 1,
      title: 'Dune: Part Two',
      thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=300',
      duration: '2h 46min',
      views: 245,
      uploadDate: '2024-03-10',
    },
    {
      id: 2,
      title: 'Poor Things',
      thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300',
      duration: '2h 21min',
      views: 189,
      uploadDate: '2024-03-09',
    },
    {
      id: 3,
      title: 'Anyone But You',
      thumbnail: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?auto=format&fit=crop&w=300',
      duration: '1h 43min',
      views: 167,
      uploadDate: '2024-03-08',
    },
  ];

  return (
    <div className="bg-gray-800 rounded-lg">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`flex items-center gap-4 p-4 ${
            index !== movies.length - 1 ? 'border-b border-gray-700' : ''
          }`}
        >
          <div className="relative w-24 h-16 rounded-lg overflow-hidden">
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium">{movie.title}</h4>
            <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {movie.duration}
              </span>
              <span>{movie.views} vues</span>
              <span>Ajouté le {movie.uploadDate}</span>
            </div>
          </div>

          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      ))}
    </div>
  );
}