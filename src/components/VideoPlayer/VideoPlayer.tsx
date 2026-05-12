import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { Poster } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

interface PlayerProps {
  src: string;
  poster?: string; // Картинка-превью, пока видео не запущено
}

const VideoPlayer = ({ src, poster }: PlayerProps) => {
  return (
    <MediaPlayer
      title="Урок курса"
      src={src}
      playsInline
      className="vds-player"
    >
      <MediaProvider>
        {poster && (
          <Poster
            src={poster}
            alt="Превью урока"
            className="vds-poster"
          />
        )}
      </MediaProvider>

      <DefaultVideoLayout 
        icons={defaultLayoutIcons} 
        thumbnails={poster} 
      />
    </MediaPlayer>
  );
};

export default VideoPlayer;