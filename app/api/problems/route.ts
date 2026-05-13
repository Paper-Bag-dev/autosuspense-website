import { NextResponse } from 'next/server';

export async function GET() {
  // Artificial delay for the whole section data
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return NextResponse.json({
    title: "The problems AutoSuspense solves.",
    subtitle: "Stop wiring fallbacks manually.",
    sections: [
      { id: 1, title: "1. Fallback Hell", desc: "Currently fallback logic tied to parent usage. Which makes it difficult to adapt. By using Suspend() we are able to provide fallback per component level and merge them later." },
      { id: 2, title: "2. Fragile Declarations", desc: "Today app structure changes break suspense fallback logic. To prevent that the entire fallback tree is collected and prebuilt so it always matches your app structure." },
      { id: 3, title: "3. Fallback Mapping", desc: "Per AutoSuspense Component Centralized fallback system with keys for easier maintainability." }
    ]
  });
}
