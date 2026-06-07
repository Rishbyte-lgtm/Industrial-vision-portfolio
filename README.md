# Amit Maurya Portfolio

Premium Next.js portfolio for Amit Maurya, a Computer Vision and Industrial Automation Engineer building AI-powered machine vision systems for manufacturing workflows.

## Featured Projects

- AI-Based Camshaft Angle Detection System
- Vision Orchestration Unit
- PLC Integrated Vision Inspection System

## Technologies

- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Resend
- Python
- OpenCV
- YOLOv8
- Siemens PLC
- Snap7
- PyQt

## Links

- Portfolio: `portfolio.coderishabhlab.qzz.io`
- LinkedIn: `linkedin.com/in/amit-maurya-84b0922a5`
- GitHub: `github.com/Rishbyte-lgtm`

## Local Setup

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Contact Form Email Delivery

The contact form uses a Next.js App Router API route at `app/api/contact/route.ts` and sends email through Resend.

Create a local `.env.local` file:

```env
RESEND_API_KEY=your_resend_api_key
```

Optional production sender:

```env
RESEND_FROM_EMAIL="Amit Maurya Portfolio <portfolio@yourdomain.com>"
```

For Vercel, add the same variables in:

`Project Settings -> Environment Variables`

Required:

- `RESEND_API_KEY`

Optional:

- `RESEND_FROM_EMAIL`

If `RESEND_API_KEY` is missing, the API returns a clear `503` error and the website shows a friendly failure message instead of crashing.
