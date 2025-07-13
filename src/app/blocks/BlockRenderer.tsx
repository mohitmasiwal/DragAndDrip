 import HeroBlock from '../components/HeroBlock';
import TwoColumnRow from '../components/TwoColumnRow';
import ImageGrid from '../components/ImageGrid';

interface Props {
  type: 'HeroBlock' | 'TwoColumnRow' | 'ImageGrid';
}

export default function BlockRenderer({ type }: Props) {
  switch (type) {
    case 'HeroBlock':
      return <HeroBlock />;
    case 'TwoColumnRow':
      return <TwoColumnRow />;
    case 'ImageGrid':
      return <ImageGrid />;
    default:
      return null;
  }
}
