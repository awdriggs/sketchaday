#!/bin/bash
# Creates a new daily post in _posts/ with today's date

DIR="$(cd "$(dirname "$0")" && pwd)"
DATE_YYYY_MM_DD=$(date +%Y-%m-%d)
DATE_MMDDYYYY=$(date +%m%d%Y)
SLUG="d${DATE_MMDDYYYY}"
FILENAME="${DIR}/_posts/${DATE_YYYY_MM_DD}-${SLUG}.md"

if [ -f "$FILENAME" ]; then
  echo "Post already exists: $FILENAME"
  exit 1
fi

cat > "$FILENAME" <<EOF
---
layout: p5-sketch
thumbnail: https://media.awd.systems/media/thumbs/${SLUG}.gif
title: ${SLUG}
date: ${DATE_YYYY_MM_DD}

script: /code/${SLUG}.js
---

EOF

echo "Created $FILENAME"
