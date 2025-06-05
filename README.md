# Value Solutions LLC Website

A responsive, bilingual (English/Spanish) static website for Value Solutions LLC, a consultancy helping businesses establish presence and operate in the United States.

## Features

- Bilingual content (English/Spanish) with language switching functionality
- Responsive design that works on all devices (mobile, tablet, desktop)
- Clean, modern design based on HTML5 UP's Landed template
- Static website for easy hosting on GitHub Pages
- Contact form with mailto functionality

## Pages

- **About Us / Presentación** (index.html) - Company information and mission
- **Services / Servicios** (services.html) - Overview of all services and pricing
- **Market Entry / Apertura de Mercado** (market-entry.html) - Services for selling products in the US
- **Company Formation / Creación de Sociedades** (company-formation.html) - Information about creating US companies
- **US Representation / Representación en EUA** (representation.html) - Staffing and representation services
- **Contact / Contacto** (contact.html) - Contact form and information

## File Structure

```
ValueSolutionsLLC/
├── index.html                   # Home/About page
├── page/
│   ├── assets/
│   │   ├── css/                 # Stylesheet files
│   │   ├── js/                  # JavaScript files including language.js
│   │   ├── webfonts/            # Font files
│   │   └── sass/                # SASS source files (if needed)
│   ├── services.html            # Services page
│   ├── market-entry.html        # Market Entry page
│   ├── company-formation.html   # Company Formation page
│   ├── representation.html      # US Representation page
│   └── contact.html             # Contact page
└── README.md                    # This file
```

## Deployment on GitHub Pages

### Setup Instructions

1. **Create a GitHub Repository**
   - Create a new repository on GitHub named `yourusername.github.io` (replace 'yourusername' with your actual GitHub username)
   - If you want to use a custom subdomain, you can name the repository whatever you want

2. **Push Your Code**
   ```bash
   # Initialize git repository (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit the files
   git commit -m "Initial website commit"
   
   # Add the remote repository
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   
   # Push to GitHub
   git push -u origin main
   ```

3. **Configure GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to the "GitHub Pages" section
   - In the "Source" dropdown, select "main" branch
   - Click "Save"

4. **Access Your Website**
   - Your website will be available at `https://yourusername.github.io`
   - It may take a few minutes for your site to be published

### Using a Custom Domain (Optional)

1. **Add a CNAME file**
   - Create a file named `CNAME` in the root of your repository
   - Add your domain name to this file (e.g., `www.valuesolutionsllc.com`)

2. **Configure DNS**
   - Go to your domain registrar's website
   - Add the following DNS records:
     - A record pointing to `185.199.108.153`
     - A record pointing to `185.199.109.153`
     - A record pointing to `185.199.110.153`
     - A record pointing to `185.199.111.153`
     - CNAME record from `www` to `yourusername.github.io`

3. **Enable HTTPS (Recommended)**
   - In your repository settings under GitHub Pages, check "Enforce HTTPS"

## Local Development

To run this site locally:

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/repository-name.git
   cd repository-name
   ```

2. Open the `index.html` file in your browser, or use a local server:
   ```bash
   # Using Python 3
   python -m http.server
   
   # Or using Python 2
   python -m SimpleHTTPServer
   ```

3. Visit `http://localhost:8000` in your web browser

## Credits

- Website design based on [Landed](https://html5up.net/landed) by HTML5 UP
- Icons by [Font Awesome](https://fontawesome.com)
- Developed for Value Solutions LLC
