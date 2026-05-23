const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://shashwatkarna.netlify.app/#person",
      "name": "Shashwat Karna",
      "url": "https://shashwatkarna.netlify.app/",
      "image": "https://shashwatkarna.netlify.app/assets/img/profile.jpg",
      "jobTitle": "AI Engineer & Full-Stack Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Amity University",
        "url": "https://www.amity.edu/"
      },
      "description": "B.Tech IT student at Amity University and an AI Engineer specializing in Full-Stack Development, Machine Learning, and Intelligent Chatbots.",
      "sameAs": [
        "https://linkedin.com/in/shashwatkarna/",
        "https://github.com/shashwatkarna",
        "https://x.com/shashwat_karna",
        "https://leetcode.com/u/intervuln/",
        "https://t.me/karn_shashwat",
        "https://discordapp.com/users/karn_shashwat",
        "https://wa.me/919971374395",
        "https://tryhackme.com/p/shashwatkarna",
        "https://www.kaggle.com/shashwatkarna",
        "https://medium.com/@shashwatkarna"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://shashwatkarna.netlify.app/#website",
      "url": "https://shashwatkarna.netlify.app/",
      "name": "Shashwat Karna | AI Engineer & Full-Stack Developer",
      "description": "Portfolio of Shashwat Karna - B.Tech IT student, AI Engineer, and Full-Stack Developer. Showcasing projects in Machine Learning, Computer Vision, and Web Applications.",
      "publisher": {
        "@id": "https://shashwatkarna.netlify.app/#person"
      }
    }
  ]
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(schemaData);
document.head.appendChild(script);
