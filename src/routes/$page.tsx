import { createFileRoute, notFound } from '@tanstack/react-router';
import { ContentPage } from '@/components/namo/site';
import { categories, navigation, pageMeta } from '@/data/catalogue';
const aliases:Record<string,string>={'industries-we-serve':'industries',news:'blogs'};
export const Route = createFileRoute('/$page')({
 loader:({params})=>{const raw=params.page.replace('.html','');const page=aliases[raw]||raw;if(!navigation.some(n=>n.page===page)&&!categories.some(c=>c.slug===page))throw notFound();return {page};},
 head:({loaderData})=>{const page=loaderData?.page;const c=categories.find(c=>c.slug===page);return pageMeta(c?.name||navigation.find(n=>n.page===page)?.name||'Page unavailable',c?.detail||`Discover ${navigation.find(n=>n.page===page)?.name||'branding solutions'} at NAMO Enterprises, your printing, packaging and branding partner in Bangalore.`);},
 component:Page,
});
function Page(){const {page}=Route.useLoaderData();return <ContentPage page={page}/>;}
