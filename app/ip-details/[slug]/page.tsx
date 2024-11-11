import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

export default async function IpDetails({params,}:{params: Promise<{ slug: string }>}) {

    const slug = (await params).slug
    let data = await fetch('https://businessautomata.com/ip-cores/api/ips/' + slug)
    let ip = await data.json()

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-200 to-blue-300 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">{ip.payload.name}</h1>
                <div>
                    <div className="text-lg font-semibold mb-1">Overview</div>
                    <p className="text-gray-700 mb-4">
                        {ip.payload.overview ? ip.payload.overview : ip.payload.short_desc}
                    </p>
                    <div className="mb-4">
                        <div className="text-base"><span className="font-semibold">Vendor: </span><span className="font-thin">Coming Soon</span></div>
                        <div className="text-base"><span className="font-semibold">Process Node: </span><span className="font-thin">Coming Soon</span></div>
                        <div className="text-base"><span className="font-semibold">Foundry: </span><span className="font-thin">Coming Soon</span></div>
                    </div>
                    <div className="text-lg font-semibold mb-1">Tech Specs</div>
                    <div className="text-gray-700 mb-4">
                        {ip.payload.tech_specs ? JSON.parse(ip.payload.tech_specs).map((item: { Specification: string; Value: string; }, i: Key | null | undefined) => (
                            <div key={i} className="text-sm">
                                <span className="font-normal">{item.Specification}: </span><span className="font-thin">{item.Value}</span>
                            </div>
                        )) : <div>Tech Specs are Coming Soon!</div>}
                    </div>
                    <div className="text-lg font-semibold mb-1">Benefits</div>
                    <div className="text-gray-700 mb-4">
                        {ip.payload.benefits ? JSON.parse(ip.payload.benefits).map((item: { benefit: string; description: string; }, i: Key | null | undefined) => (
                            <div key={i} className="text-sm">
                                <span className="font-normal">{item.benefit}: </span><span className="font-thin">{item.description}</span>
                            </div>
                        )) : <div>Tech Specs are Coming Soon!</div>}
                    </div>
                    <div className="text-lg font-semibold mb-1">Applications</div>
                    <div className="text-gray-700 mb-4">
                        {ip.payload.applications ? JSON.parse(ip.payload.applications).map((item: string, i: Key | null | undefined) => (
                            <li key={i} className="text-sm">
                                {item}
                            </li>
                        )) : <div>Tech Specs are Coming Soon!</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
