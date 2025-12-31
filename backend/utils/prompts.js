const blogPostIdeasPrompt = (topic) => `
    Generate a list of 5 blog post ideas related to ${topic}.

    For each blog post idea, return:
    - a title
    - a 2-line description
    - 3 relevant tags
    - the tone (e.g., technical, casual, beginner-friendly, etc.)

    Return the result as an array of JSON objects in this format:
    [
        {
            "title": "",
            "description": "",
            "tags": ["", "", ""],
            "tone": ""
        }
    ] 

    IMPORTANT : DO NOT add any extra text outside the JSON format. Only return valid JSON. 
`;

const generateReplyPrompt = (comment) => {
  const autherName = comment.author?.name || "User";
  const content = comment.content;

  return ` You're replying to this comment by ${autherName}. The comment says:
  
  "${content}"
  
  Write a thoughful, concise, and relevant reply to this comment.`;
};

const generateBlogSummaryPrompt = (blogContent) => `
    You are an AI assistant that summarizes blog posts.

    Instructions:
    - Read the Blog Post Content below.
    - Generate a short, catchy, SEO-friendly title (max 12 words).
    - Write a clear, engaging summary of about 300 words.
    - At the end of that summary, add a markdown section titled **## What You'll Learn**.
    - Under that heading, list 3-5 key takeaways or skills the reader will learn in **bullet points** using markdown (\`-\`).

    Return the result in **valid JSON** with the following structure:

    {
        "title": "Short SEO-friendly title",
        "summary": "300-word summary with a markdown section for What You'll Learn"
    }

    Only return valid JSON. Do not include markdown or code blocks around JSON.

    Blog Post Content:
    ${blogContent}
`;

module.exports = {
  blogPostIdeasPrompt,
  generateReplyPrompt,
  generateBlogSummaryPrompt,
};
