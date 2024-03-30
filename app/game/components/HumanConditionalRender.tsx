import Lottie from 'react-lottie-player';
import humanPlayer from '@/public/me.svg';
import Image from 'next/image';
import stabbing from '@/public/stabbing';
import swing from '@/public/swing';

const HumanConditionalRender = ({ attackType }: { attackType: string }) => {
  if (attackType === 'stab')
    return <Lottie loop animationData={stabbing} play style={{ width: 500 }} />;
  else if (attackType === 'swing')
    return <Lottie animationData={swing} play style={{ width: 400 }} />;
  else return <Image className="" src={humanPlayer} alt={''}></Image>;
};

export default HumanConditionalRender;
