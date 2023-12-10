import { Image } from 'antd';

export const Photo = ({ src, height }) => {
  return (
    <Image
      src={`https://api.myraj.au/${src}`}
      width={300}
      height={400}
      loading="lazy"
      style={{ objectFit: 'cover' }}
    />
    // <Image
    //   src={`${process.eventNames.REACT_APP_API_URL}/${src}`}
    //   width={300}
    //   height={400}
    //   loading="lazy"
    //   style={{ objectFit: 'cover' }}
    // />
  );
};
