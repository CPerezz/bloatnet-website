# Bloatnet Initiative Website

A comprehensive research platform for Ethereum's scaling future through experimental blockchain parameters.

## 🚀 Quick Start

### Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd bloatnet_website

# Start local server
python3 -m http.server 3000
# or
npx serve . -p 3000
```

Visit `http://localhost:3000` to view the website.

## 📝 LogBook Data Format

The LogBook feature displays project updates and milestones. Logs are stored in `data/logs.json` with the following format:

### JSON Structure
```json
{
  "logs": [
    {
      "id": "unique_log_id",
      "timestamp": "ISO 8601 format (e.g., 2024-12-20T14:30:00Z)",
      "category": "milestone|feature|bugfix|research|infrastructure|documentation",
      "title": "Short descriptive title",
      "description": "Detailed description of the update",
      "details": [
        "Optional array of bullet points",
        "Providing additional details"
      ],
      "tags": ["optional", "searchable", "tags"],
      "author": "Author name or team"
    }
  ]
}
```

### Field Descriptions
- **id**: Unique identifier for the log entry
- **timestamp**: Date and time in ISO 8601 format
- **category**: One of: milestone, feature, bugfix, research, infrastructure, documentation
- **title**: Brief title summarizing the update
- **description**: Main content describing the update
- **details** (optional): Array of strings for additional bullet points
- **tags** (optional): Array of searchable tags
- **author**: Name of the person or team responsible for the update

### Example Entry
```json
{
  "id": "log_001",
  "timestamp": "2024-12-20T14:30:00Z",
  "category": "milestone",
  "title": "Bloatnet Initiative Launch",
  "description": "Official launch of the Bloatnet Initiative website.",
  "details": [
    "Initial website deployment",
    "Core documentation published"
  ],
  "tags": ["launch", "milestone"],
  "author": "Bloatnet Team"
}
```

**Built with ❤️ for Ethereum's scaling & stateless future**
