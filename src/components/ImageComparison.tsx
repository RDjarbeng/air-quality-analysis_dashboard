import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type ImageComparisonProps = {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
};

const ImageComparison = ({ beforeImage, afterImage, beforeLabel = 'Before', afterLabel = 'After' }: ImageComparisonProps) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Image Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative  w-full">
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={beforeImage}
                alt={beforeLabel}
                style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={afterImage}
                alt={afterLabel}
                style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
              />
            }
            position={50}
            style={{ width: '100%', height: 'auto' }} // Let height adapt to content
          />
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded">
            {beforeLabel}
          </div>
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded">
            {afterLabel}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageComparison;