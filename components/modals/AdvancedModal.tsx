import React from 'react';
import Modal from './Modal';
import { externalLinkProps, legalLinks } from '@/data/legal-links';

export interface AdvancedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdvancedModal: React.FC<AdvancedModalProps> = ({ open, onOpenChange }) => {
    const [isOpen, setIsOpen] = React.useState(open);

    React.useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleClose = () => {
        setIsOpen(false);
        onOpenChange(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            title=""
            onClose={handleClose}
        >

            <div className="w-full mb-10">
                <p className='font-[600]'>Privacy Policy</p>
                <p className='text-[#1c2b33] font-[300]'>What is the Privacy Policy and what does it cover?</p>

                <div className='rounded-[12px] bg-white px-4 py-3 cursor-pointer flex items-center justify-between gap-0 my-4 hover:bg-[#E3E8EF] transition-all duration-200'>
                    <div className='flex items-center justify-center justify-start gap-3'>
                        <div className='w-[45px] h-[45px] min-w-[45px] min-h-[45px] max-w-[45px] max-h-[45px]'>
                            <img src="/images/icons/ic_star.png" className='w-full h-full' alt="locked" />
                        </div>
                        <div>
                            <p className='font-[300] text-[15px] text-[#465a69]'>The main thing in the section</p>
                        </div>
                    </div>
                    <div className={`w-[17px] h-[17px] min-w-[17px] min-h-[17px] max-w-[17px] max-h-[17px] transition-all duration-200`}>
                        <img src="/images/icons/ic_arrow.svg" className='w-full h-full rotate-[-90deg]' alt="arrow" />
                    </div>
                </div>

                <p className='text-[#1c2b33] font-[300] mb-4 text-[15px]'>We want you to understand what information we collect, how we use it, and with whom we share it. We recommend reading this Privacy Policy in full so you can use <a href={legalLinks.metaAbout} className='text-[#0064E0] hover:underline' {...externalLinkProps}>our products <img src="/images/icons/ic_reject.svg" alt="" className='inline w-[13px] h-[13px] min-w-[13px] min-h-[13px] max-w-[13px] max-h-[13px]' /></a> in the way that suits you.</p>
                <p className='text-[#1c2b33] font-[300] mb-4 text-[15px]'>The Privacy Policy explains how we collect, use, store, and share information, and describes your rights. Each section includes practical examples and plain-language summaries. Where a topic needs more depth, we link to additional resources.</p>
                <p className='text-[#1c2b33] font-[300] mb-4 text-[15px]'>We also show you where to manage privacy settings in the products you use. You can <a href={legalLinks.accountSettings} className='text-[#0064E0] hover:underline' {...externalLinkProps}>update these settings <img src="/images/icons/ic_reject.svg" alt="" className='inline w-[13px] h-[13px] min-w-[13px] min-h-[13px] max-w-[13px] max-h-[13px]' /></a> to personalize your experience.</p>
            </div>

            <div className='w-full mb-10'>
                <p className='font-[600] mb-4'>The full policy text is provided below</p>

                <div className='hover:bg-[#E3E8EF] transition-all duration-200 rounded-tl-[12px] rounded-tr-[12px] border-b border-[#E3E8EF] cursor-pointer bg-white px-4 py-3 cursor-pointer flex items-center justify-between gap-0'>
                    <div className='flex items-center justify-center justify-start gap-3'>
                        <div>
                            <p className='font-[300] text-[15px] text-[#465a69]'>What products are covered by this policy?</p>
                        </div>
                    </div>
                    <div className={`w-[17px] h-[17px] min-w-[17px] min-h-[17px] max-w-[17px] max-h-[17px] transition-all duration-200`}>
                        <img src="/images/icons/ic_arrow.svg" className='w-full h-full rotate-[-90deg]' alt="arrow" />
                    </div>
                </div>
                <div className='hover:bg-[#E3E8EF] transition-all duration-200 rounded-bl-[12px] rounded-br-[12px] bg-white px-4 py-3 cursor-pointer flex items-center justify-between gap-0 mb-4'>
                    <div className='flex items-center justify-center justify-start gap-3'>
                        <div>
                            <p className='font-[300] text-[15px] text-[#465a69]'>What products are covered by this policy?</p>
                        </div>
                    </div>
                    <div className={`w-[17px] h-[17px] min-w-[17px] min-h-[17px] max-w-[17px] max-h-[17px] transition-all duration-200`}>
                        <img src="/images/icons/ic_arrow.svg" className='w-full h-full rotate-[-90deg]' alt="arrow" />
                    </div>
                </div>
            </div>

            <div className='w-full mb-10'>
                <p className='font-[600] mb-4'>What information do we collect?</p>
                <p className='text-[#1c2b33] font-[300] mb-4 text-[15px]'>The information we collect depends on how you use our <a href={legalLinks.metaAbout} className='text-[#0064E0] hover:underline' {...externalLinkProps}>products <img src="/images/icons/ic_reject.svg" alt="" className='inline w-[13px] h-[13px] min-w-[13px] min-h-[13px] max-w-[13px] max-h-[13px]' /></a>. For example, we may collect different data when you use commerce features than when you upload short-form video content. We may also collect limited data when you interact with our services <a href={legalLinks.privacyPolicy} className='text-[#0064E0] hover:underline' {...externalLinkProps}>without signing in <img src="/images/icons/ic_reject.svg" alt="" className='inline w-[13px] h-[13px] min-w-[13px] min-h-[13px] max-w-[13px] max-h-[13px]' /></a>, where permitted by law.</p>
            </div>

            <div className='w-full mb-10'>
                <p className='font-[600] mb-4'>The following are the types of data we collect:</p>

                <div className='hover:bg-[#E3E8EF] transition-all duration-200 rounded-tl-[12px] rounded-tr-[12px] border-b border-[#E3E8EF] cursor-pointer bg-white px-4 py-3 cursor-pointer flex items-center justify-between gap-0'>
                    <div className='flex items-center justify-center justify-start gap-3'>
                        <div>
                            <p className='font-[300] text-[15px] text-[#465a69]'>Your actions and information you provide to us</p>
                        </div>
                    </div>
                    <div className={`w-[17px] h-[17px] min-w-[17px] min-h-[17px] max-w-[17px] max-h-[17px] transition-all duration-200`}>
                        <img src="/images/icons/ic_arrow.svg" className='w-full h-full rotate-[-90deg]' alt="arrow" />
                    </div>
                </div>
                <div className='hover:bg-[#E3E8EF] transition-all duration-200 border-b border-[#E3E8EF] cursor-pointer bg-white px-4 py-3 cursor-pointer flex items-center justify-between gap-0'>
                    <div className='flex items-center justify-center justify-start gap-3'>
                        <div>
                            <p className='font-[300] text-[15px] text-[#465a69]'>Friends, subscribers and other contacts</p>
                        </div>
                    </div>
                    <div className={`w-[17px] h-[17px] min-w-[17px] min-h-[17px] max-w-[17px] max-h-[17px] transition-all duration-200`}>
                        <img src="/images/icons/ic_arrow.svg" className='w-full h-full rotate-[-90deg]' alt="arrow" />
                    </div>
                </div>
                <div className='hover:bg-[#E3E8EF] transition-all duration-200 border-b border-[#E3E8EF] cursor-pointer bg-white px-4 py-3 cursor-pointer flex items-center justify-between gap-0'>
                    <div className='flex items-center justify-center justify-start gap-3'>
                        <div>
                            <p className='font-[300] text-[15px] text-[#465a69]'>Application, browser and device information</p>
                        </div>
                    </div>
                    <div className={`w-[17px] h-[17px] min-w-[17px] min-h-[17px] max-w-[17px] max-h-[17px] transition-all duration-200`}>
                        <img src="/images/icons/ic_arrow.svg" className='w-full h-full rotate-[-90deg]' alt="arrow" />
                    </div>
                </div>
                <div className='hover:bg-[#E3E8EF] transition-all duration-200 rounded-bl-[12px] rounded-br-[12px] bg-white px-4 py-3 cursor-pointer flex items-center justify-between gap-0 mb-4'>
                    <div className='flex items-center justify-center justify-start gap-3'>
                        <div>
                            <p className='font-[300] text-[15px] text-[#465a69]'>Information from Partners, suppliers and other third parties</p>
                        </div>
                    </div>
                    <div className={`w-[17px] h-[17px] min-w-[17px] min-h-[17px] max-w-[17px] max-h-[17px] transition-all duration-200`}>
                        <img src="/images/icons/ic_arrow.svg" className='w-full h-full rotate-[-90deg]' alt="arrow" />
                    </div>
                </div>
            </div>

            <div className='w-full mb-10'>
                <p className='font-[600] mb-4'>What happens if you do not allow us to collect certain types of information?</p>
                <p className='text-[#1c2b33] font-[300] mb-4 text-[15px]'>Some information is necessary for the operation of our Products. Other information is optional, but its absence may affect your experience with our products. <a href={legalLinks.privacyPolicy} className='text-[#0064E0] hover:underline' {...externalLinkProps}>More details <img src="/images/icons/ic_reject.svg" alt="" className='inline w-[13px] h-[13px] min-w-[13px] min-h-[13px] max-w-[13px] max-h-[13px]' /></a>.</p>
            </div>

            <div className='w-full mb-10'>
                <p className='font-[600] mb-4'>What if the information we collect does not personally identify individuals?</p>
                <p className='text-[#1c2b33] font-[300] mb-4 text-[15px]'>In some cases, before third parties make information available to us, they de-identify, aggregate, or anonymize it so that it cannot be used to identify individual individuals. We use this information as described below, without attempting to re-identify individuals.</p>
            </div>

            <div className="w-full mb-10">
                <p className='font-[600]'>Data control</p>

                <div className='rounded-[12px] bg-white px-4 py-3 cursor-pointer flex items-center justify-between gap-0 my-4 hover:bg-[#E3E8EF] transition-all duration-200'>
                    <div className='flex items-center justify-center justify-start gap-3'>
                        <div className='w-[45px] h-[45px] min-w-[45px] min-h-[45px] max-w-[45px] max-h-[45px]'>
                            <img src="/images/icons/ic_docs_women.png" className='w-full h-full' alt="locked" />
                        </div>
                        <div>
                            <p className='font-[500] text-[15px]'>Manage the information we collect about you</p>
                            <p className='font-[300] text-[15px] text-[#465a69]'>Privacy Center</p>
                        </div>
                    </div>
                    <div className={`w-[17px] h-[17px] min-w-[17px] min-h-[17px] max-w-[17px] max-h-[17px] transition-all duration-200`}>
                        <img src="/images/icons/ic_arrow.svg" className='w-full h-full rotate-[-90deg]' alt="arrow" />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AdvancedModal;
