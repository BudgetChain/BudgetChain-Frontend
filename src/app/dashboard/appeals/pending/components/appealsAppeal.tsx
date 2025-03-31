'use client';

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Button from "@/components/form/Button"
import Image from "next/image"

interface AppealData {
    id: string;
    status: 'pending' | 'approved' | 'rejected';
    amount: number;
    project: string;
    description: string;
    date: string;
    time: string;
}

// This would typically come from an API or database
const mockAppealData: AppealData = {
    id: 'appeal-123',
    status: 'pending',
    amount: 20000,
    project: 'Ndida Project',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
  Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.
  Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisi. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id nisl ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.
  Vestibulum dictum ultrices elit a luctus. Sed metus at leo congue pharetra at sit amet ligula. Pellentesque eget augue nec nisl sodales blandit sed et sem. Aenean quis finibus diam. Nulla feugiat purus. Praesent ac aliquet lorem. Morbi feugiat aliquam ligula.
  
  Yours Faithfully
  Joe Dele`,
    date: '12/01/2027',
    time: '8:00 UTC',
};

const AppealsAppeal = () => {
    const [appeal] = useState<AppealData>(mockAppealData);
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>(
        appeal.status
    );
    const [activeTab, setActiveTab] = useState<'appeal' | 'document'>('appeal');

    const handleApprove = () => {
        setStatus('approved');
    };

    const handleReject = () => {
        setStatus('rejected');
    };

    // Helper function to conditionally join class names
    const cn = (...classes: (string | boolean | undefined)[]) => {
        return classes.filter(Boolean).join(' ');
    };

    return (
        <div className="flex flex-col overflow-hidden scrollbar-hide w-full p-6 overflow-y-auto max-h-[calc(100vh-150px)] min-h-screen bg-[#171720]">
            <div className="w-full">
                {activeTab === 'appeal' && (
                    <div className="mt-0">
                        <div className="bg-[#171720 shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)] my-5 rounded-lg p-6 relative">
                            <button
                                onClick={() => window.history.back()}
                                className="flex items-center mb-10 text-muted-foreground "
                            >
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                <span className="text-[#848484]">Pending Appeal</span>
                            </button>

                            <div className="flex flex-col items-center justify-center mb-8">
                                <p className="text-sm text-muted-foreground">Request of</p>
                                <h1 className="text-3xl font-bold">
                                    ${appeal.amount.toLocaleString()}
                                </h1>
                                <p className="text-sm text-muted-foreground mt-4">
                                    From{' '}
                                    <span className="font-medium text-white">
                                        {appeal.project}
                                    </span>
                                </p>

                                <div className="flex gap-4 mt-6">
                                    <Button
                                        variant="outline"
                                        onClick={handleReject}
                                        disabled={status !== 'pending'}
                                        className={cn(
                                            'px-8',
                                            status === 'rejected' &&
                                            'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                        )}
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        onClick={handleApprove}
                                        disabled={status !== 'pending'}
                                        className={cn(
                                            'px-8',
                                            status === 'approved' && 'bg-green-600 hover:bg-green-700'
                                        )}
                                    >
                                        Approve
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-12 relative   px-16">
                                <div className="border-t border-[#42415B] flex flex-col justify-center items-center pb-10">
                                    <h2 className="text-lg font-semibold uppercase tracking-wider mb-6 pt-9">
                                        Request for more funds
                                    </h2>

                                    <div className="whitespace-pre-line tracking-widest">
                                        {appeal.description.split('\n').map((paragraph, index) => (
                                            <p key={index} className="mb-4">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>

                                    {status === "approved" && (
                                        <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 opacity-80">
                                            <Image
                                                src="/approve.svg"
                                                alt="approved"
                                                className=" w-72 h-60 -rotate-[17deg]"
                                            />
                                        </div>
                                    )}

                                    {status === 'rejected' && (
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 opacity-80">
                                            <div className="border-8 border-red-600 rounded-full p-8 w-48 h-48 flex items-center justify-center">
                                                <span className="text-red-600 font-bold text-2xl uppercase">
                                                    Rejected
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="text-right pr-16 mt-4 text-xs text-gray-400">
                                Date: {appeal.date} Time: {appeal.time}
                            </div>
                        </div>
                        <div className="mt-12">
                            <p className="text-sm text-white px-3 cursor-pointer font-semibold">
                                Write a comment
                            </p>
                            <div className="flex justify-between items-center p-2 rounded-lg mt-1">
                                <span className="bg-white text-[#4F4AE6] mr-3 px-2.5 py-2.5 text-sm rounded-full">
                                    EP
                                </span>
                                <input
                                    type="text"
                                    placeholder="Write a comment"
                                    className="bg-transparent rounded-lg border border-gray-400 p-4 flex-1 px-3 text-white outline-none"
                                />
                            </div>
                            <span className="flex flex-col justify items-end text-gray-500 text-xs mt-2 mr-2">
                                <p>4:09 PM UTC</p>
                                <span>20/02/2027</span>
                            </span>
                        </div>
                    </div>
                )}

                {activeTab === 'document' && (
                    <div className="p-6 text-center text-muted-foreground">
                        Document view would go here
                    </div>
                )}
            </div>
        </div>
    );
}

export default AppealsAppeal;