 import HeroBlock from '../components/HeroBlock';
import TwoColumnRow from '../components/TwoColumnRow';
import ImageGrid from '../components/ImageGrid';

interface Props {
  type: 'HeroBlock' | 'TwoColumnRow' | 'ImageGrid';
  data: any;
}

export default function BlockRenderer({ type, data }: Props) {
  switch (type) {
    case 'HeroBlock':
      return <HeroBlock {...data} />;
    case 'TwoColumnRow':
      return <TwoColumnRow {...data} />;
    case 'ImageGrid':
      return <ImageGrid images={data} />;
    default:
      return null;
  }
}
