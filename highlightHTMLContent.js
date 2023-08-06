// function to preprocess the plainTextPositions so that to avoid irregular or overlapping or invalid positions
function preprocessPositions(plaintextPositions) {
  const sortedPositions = plaintextPositions.sort((a, b) => a.start - b.start);

  const combinedPositions = [];
  let currentObject = sortedPositions[0];

  for (let i = 1; i < sortedPositions.length; i++) {
    const nextObject = sortedPositions[i];

    if (currentObject.end >= nextObject.start) {
      currentObject = {
        start: Math.min(currentObject.start, nextObject.start),
        end: Math.max(currentObject.end, nextObject.end),
      };
    } else {
      combinedPositions.push(currentObject);
      currentObject = nextObject;
    }
  }

  combinedPositions.push(currentObject);

  return combinedPositions;
}
// function to check before proccesing the htmlContent and avoid unkown errors
function handleChecks(htmlContent, plainText, plainTextPositions) {
  // Checking if the htmlContent, plainText, and plainTextPositions are of the correct data types
  if (typeof htmlContent !== "string" || htmlContent.length === 0) {
    throw new Error("htmlContent must be a non-empty string");
  }

  if (typeof plainText !== "string" || plainText.length === 0) {
    throw new Error("plainText must be a non-empty string");
  }

  if (!Array.isArray(plainTextPositions)) {
    throw new Error("plainTextPositions must be an array");
  }

  // Checking for HTML tags 
  if (!/<[a-z][\s\S]*>/i.test(htmlContent)) {
    console.warn("htmlContent should contain at least one HTML tag");
  }

  // Checking if each object in plainTextPositions has the correct format
  for (let i = 0; i < plainTextPositions.length; i++) {
    const obj = plainTextPositions[i];

    if (typeof obj !== "object" || obj === null) {
      throw new Error(
        'Each object in plainTextPositions must be of type "object"'
      );
    }

    if (typeof obj.start !== "number" || typeof obj.end !== "number") {
      throw new Error(
        'Each object in plainTextPositions must have properties "start" and "end" of type "number"'
      );
    }
  }

  // Check if plainTextPositions is not empty
  if (plainTextPositions.length === 0) {
    throw new Error("plainTextPositions cannot be empty");
  }

  // Check if the values of start and end in each object of plainTextPositions are within the valid range
  for (let i = 0; i < plainTextPositions.length; i++) {
    const obj = plainTextPositions[i];
    
    if (typeof obj.start !== "number" || obj.start < 0 || obj.start >= htmlContent.length) {
      throw new Error("Each object in plainTextPositions must have a valid 'start' value");
    }
    
    if (typeof obj.end !== "number" || obj.end <= obj.start || obj.end > htmlContent.length) {
      throw new Error("Each object in plainTextPositions must have a valid 'end' value");
    }
  }
}
// function that takes single object at a time from plaintext and highlights that part
function SingleHighlightHTMLContent(start, end, htmlContent, plainTextContent) {
  const plainLength = plainTextContent.length;
  const htmlLength = htmlContent.length;
  let finalHTMLContent = "";
  let i, j;
  for (
    i = 0, j = 0;
    i < htmlLength && j < plainLength;
    i++
  ) {
    if (plainTextContent[j] === " " || htmlContent[i] === plainTextContent[j]) {
      if (j === start) {
        finalHTMLContent=finalHTMLContent.concat("<mark>");
      }
      if (j === end) {
        finalHTMLContent=finalHTMLContent.concat("</mark>");
      }
      j++;
    }
    finalHTMLContent=finalHTMLContent.concat(htmlContent[i]);
  }

  if (end === plainLength) {
    finalHTMLContent=finalHTMLContent.concat("</mark>");
  }
  for (; i < htmlLength; i++) {
    finalHTMLContent=finalHTMLContent.concat(htmlContent[i]);
  }

  return finalHTMLContent;
}
function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {

  handleChecks(htmlContent, plainText, plainTextPositions)

  plainTextPositions=preprocessPositions(plainTextPositions);

  plainTextPositions.forEach((value) => {
    let start = value.start;
    let end = value.end;
    htmlContent = SingleHighlightHTMLContent(
      start,
      end,
      htmlContent,
      plainText
    );
  });
  return htmlContent;
}
module.exports = highlightHTMLContent;
