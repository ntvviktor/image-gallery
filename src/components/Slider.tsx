import { HStack, VStack, Button, Flex} from "@chakra-ui/react"
import { useCallback, useEffect, useRef, useState, WheelEvent } from "react"
import {
  motion,
  HTMLMotionProps,
} from "framer-motion"
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import "./Slider.css"

const images = [
  "/images/b1.JPG",
  "/images/b2.JPG",
  "/images/b3.JPG",
  "/images/b4.JPG",
  "/images/b6.jpg",
  // "/images/b7.jpg"
  "/images/retro1.jpg",
  "/images/retro2.jpg",
  "/images/retro4.jpg",
  // "/images/retro5.jpg",
];

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const Slider = () => {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, -1]);

  const paginate = useCallback(
    (dir: number) =>
      setCurrentIndex([wrap(0, images.length, currentIndex + dir), dir]),
    [currentIndex]
  );

  const paginateTo = useCallback((index: number) => {
    setCurrentIndex((prevState) => {
      return [index, index > prevState[0] ? 1 : -1];
    });
  }, []);

  const handleDrag = useCallback<
    NonNullable<HTMLMotionProps<"div">["onDragEnd"]>>(
      (e, { offset, velocity }) => {
        (e.target as HTMLDivElement).style.cursor = "grab";

        const swipe = swipePower(offset.x, velocity.x);
        if (swipe < -1000) {
          paginate(1);
        } else if (swipe > 1000) {
          paginate(-1);
        }
      },
      [paginate]
    );


  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.scrollBy({
      left: e.deltaY < 0 ? -500 : 500,
    });
    if (e.deltaY < -50) {
      paginate(1);
    } else if (e.deltaY > 50) {
      paginate(-1);
    }
  };

  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    setWidth(carouselRef?.current?.scrollWidth - carouselRef?.current?.offsetWidth);
    console.log(carouselRef?.current?.scrollWidth - carouselRef?.current?.offsetWidth)
  }, [])


  return (
      <VStack>
        <motion.div ref={carouselRef} whileTap={"grabbing"}
          className="carousel"
        >
          <motion.div
            onWheel={handleWheel}
            className="inner"
            drag='x'
            dragConstraints={{ left: -width, right: 120 }}
            dragElastic={0.4}
            whileInView={"full"}
            onDragEnd={handleDrag}
          >
            {images.map((url, index) => (
              <motion.div
                className="item"
                key={index}
                custom={direction}
                animate={{
                  rotate: 0,
                  left: `${(index - currentIndex) * 80 + 20}vw`,
                  scale: index === currentIndex ? 1 : 0.8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 50,
                }}
              >
                <img src={url}></img>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <HStack spacing={2} align='center'>
          <Button colorScheme="gray" 
            size={['sm', 'md']}
          onClick={() => paginate(-1)}>
            <FaArrowLeft />
          </Button>

          {images.map((_, index) => (
            <Flex direction='column' boxSize="fit-content" alignItems='center'>
              <Button
                colorScheme="gray"
                size={['sm', 'md']}
                onClick={() => paginateTo(index)}
                disabled={index === currentIndex}
              >
                {index + 1}
              </Button>
              {index === currentIndex && (
                <motion.div
                  style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#303030',
                    borderRadius: '50%',
                    marginTop: '2px',
                  }}
                  layoutId="indicator" />
              )}
            </Flex>
          ))}

          <Button colorScheme="gray"
            size={['sm', 'md']}
            onClick={() => paginate(1)}>
            <FaArrowRight />
          </Button>
        </HStack>
      </VStack>
  )
}

export default Slider