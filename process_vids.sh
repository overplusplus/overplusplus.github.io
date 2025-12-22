#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 /path/to/folder"
  exit 1
fi

BITRATE="600k"
CRF=30

# TODO
# ffmpeg -i "/playpen-nas-ssd/luchao/projects/overplusplus.github.io/assets/videos/teaser/teaser.mp4" \
#         -c:v libx265 -crf "28" \
#         -pix_fmt yuv420p -tag:v hvc1 \
#         "/playpen-nas-ssd/luchao/projects/overplusplus.github.io/assets/videos/teaser/teaser-tmp.mp4" \
#         -y

find "$1" -type f -iname "*.mp4" -print0 |
while IFS= read -r -d '' file; do
    filename="${file%.*}"
    echo "Processing: $file"

    ffmpeg -i "$file" \
      -c:v libvpx-vp9 -b:v "$BITRATE" -crf "$CRF" \
      -pix_fmt yuv420p \
      -an "$filename.webm" \
      -y
done

echo "Conversion complete!"
