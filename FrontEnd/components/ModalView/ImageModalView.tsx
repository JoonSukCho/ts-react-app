import Image from 'next/image';
import { useEffect, useState } from 'react';
import Carousel from 'react-slick';
import type { Settings } from 'react-slick';
import styled from 'styled-components';

// Hooks
import useImageInfo from 'Hooks/api/useImageInfo';

// core components
import CarouselDot from 'components/CustomIcons/CarouselDot';

// @material-ui
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

interface ImageModalViewProps {
  contentId: number;
}

const ImageModalView = ({ contentId }: ImageModalViewProps) => {
  const { data: imageInfo, isFetched: imageInfoIsFetched } = useImageInfo({
    contentId,
  });

  // local state
  const [carouselSettings] = useState<Settings>({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    // lazyLoad: 'progressive',
    appendDots: (dots: any[]) => {
      return (
        <ul>
          {dots.map((dot) => (
            <CarouselDot
              key={dot.key}
              active={dot.props.className === 'slick-active'}
            />
          ))}
        </ul>
      );
    },
  });
  const [imageList, setImageList] = useState([]);
  const [imageLoaded, setImageLoaded] = useState([]);

  useEffect(() => {
    if (imageInfoIsFetched) {
      setImageLoaded(imageInfo.itemList.map(() => false));
      setImageList(
        imageInfo.itemList.map((imageItem) => ({
          url: imageItem.imageUrl,
          serialNum: imageItem.serialnum,
        })),
      );
    }
  }, [imageInfoIsFetched]);

  return (
    <Card style={{ touchAction: 'pan-x' }}>
      {imageInfoIsFetched ? (
        <Carousel {...carouselSettings}>
          {imageList.length > 0 ? (
            imageList.map((imageItem, idx) => (
              <ImgContainer key={imageItem.serialNum}>
                <Image
                  src={imageItem.url}
                  alt="Image Not Found"
                  layout="fill"
                  objectFit="fill"
                  quality={10}
                  onLoadingComplete={() => {
                    setImageLoaded((prev) => {
                      prev[idx] = true;
                      return [...prev];
                    });
                  }}
                />
                {!imageLoaded[idx] && <ImageLoadProgress />}
              </ImgContainer>
            ))
          ) : (
            <ImgContainer>
              <Image
                src="/img/ready-image.jpg"
                alt="Image Not Found"
                layout="fill"
                objectFit="fill"
              />
            </ImgContainer>
          )}
        </Carousel>
      ) : (
        <ImgContainer style={{ background: '#eee' }} />
      )}
    </Card>
  );
};

const ImgContainer = styled.div`
  position: relative;
  height: 300px;

  @media (min-width: 768px) {
    height: 500px;
  }
`;

const ImageLoadProgress = styled(CircularProgress)`
  position: absolute;
  top: calc(50% - 13px);
  left: calc(50% - 20px);
`;

// const Image = styled.img`
//   width: 100%;
//   height: 102%;
// `;

export default ImageModalView;
