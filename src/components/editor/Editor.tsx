"use client";

import styles from './styles.module.css';
import React, { useRef, useEffect } from 'react';
import {
    BgColorIcon, BoldIcon, CenterAlignIcon, ColorIcon, FullJustifyIcon,
    HeadingIcon, ImgIcon, ItalicIcon, LeftAlignIcon, UnderlIneIcon
} from '../../ui/icons/editorIcons/EditorIcons';
import { uploadImage } from '@/utils/utils';

export default function Editor({ data, setContent }: { data: string, setContent: any }) {
    const editorRef = useRef<HTMLDivElement>(null);


    // This is for Image upload  --START--
    let savedRange: Range | null = null;
    const saveCaret = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            savedRange = selection.getRangeAt(0);
        }
    };
    const restoreCaret = () => {
        const selection = window.getSelection();
        if (savedRange && selection) {
            selection.removeAllRanges();
            selection.addRange(savedRange);
        }
    };
    // This is for Image upload --END--






    const handleImg = (url: string) => document.execCommand('insertImage', true, url);
    const handleBold = () => document.execCommand('bold');
    const handleItalic = () => document.execCommand('italic');
    const handleNormal = () => document.execCommand('fontSize', false, '3');
    const handleHeading = () => document.execCommand('fontSize', false, '6');
    const handleUnderLine = () => document.execCommand('underline');
    const handleLeftAlign = () => document.execCommand('justifyLeft');
    const handleCenterAlign = () => document.execCommand('justifyCenter');
    const handleFullJustify = () => document.execCommand('justifyFull');
    const handleColor = (color: string) => document.execCommand('foreColor', false, color);
    const handleBgColor = (color: string) => document.execCommand('backColor', false, color);

    const uploadImg = async (e: any) => {
        const file = e.target.files[0];
        const url = await uploadImage(file);
        restoreCaret();
        if (url) {
            handleImg(url);
        }
        e.target.value = '';
    }

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = data;
            setContent(data)
        }
    }, [data]);

    return (
        <div>
            <div className={`max-w-7xl mx-auto rounded bg-slate-50 px-3 py-4 border-slate-200 border flex flex-wrap gap-x-7 gap-y-4 mb-3 ${styles.pointerBtn}`}>
                <button onClick={handleNormal}><p className='font-serif text-[#45556c] text-[18px]'>P</p></button>
                <button onClick={handleHeading}><HeadingIcon /></button>
                <button onClick={handleBold}><BoldIcon /></button>
                <button onClick={handleItalic}><ItalicIcon /></button>
                <button onClick={handleUnderLine}><UnderlIneIcon /></button>

                <div className={styles.wrapper}>
                    <button className={styles.colorPaletteBtn}><ColorIcon /></button>
                    <div className={styles.colorPalette}>
                        <button onClick={() => handleColor('#FF0000')} className='size-4 rounded bg-[#FF0000]' />
                        <button onClick={() => handleColor('#000000')} className='size-4 rounded bg-[#000000]' />
                        <button onClick={() => handleColor('#00FF00')} className='size-4 rounded bg-[#00FF00]' />
                        <button onClick={() => handleColor('#0000FF')} className='size-4 rounded bg-[#0000FF]' />
                        <button onClick={() => handleColor('#f1f2f4')} className='size-4 rounded bg-[#f1f2f4]' />
                        <button onClick={() => handleColor('#FFFF00')} className='size-4 rounded bg-[#FFFF00]' />
                    </div>
                </div>

                <div className={styles.wrapper}>
                    <button className={styles.colorPaletteBtn}><BgColorIcon /></button>
                    <div className={styles.colorPalette}>
                        <button onClick={() => handleBgColor('#FF0000')} className='size-4 rounded bg-[#FF0000]' />
                        <button onClick={() => handleBgColor('#000000')} className='size-4 rounded bg-[#000000]' />
                        <button onClick={() => handleBgColor('#00FF00')} className='size-4 rounded bg-[#00FF00]' />
                        <button onClick={() => handleBgColor('#0000FF')} className='size-4 rounded bg-[#0000FF]' />
                        <button onClick={() => handleBgColor('#f1f2f4')} className='size-4 rounded bg-[#f1f2f4]' />
                        <button onClick={() => handleBgColor('#FFFF00')} className='size-4 rounded bg-[#FFFF00]' />
                    </div>
                </div>

                <button onClick={handleLeftAlign}><LeftAlignIcon /></button>
                <button onClick={handleCenterAlign}><CenterAlignIcon /></button>
                <button onClick={handleFullJustify}><FullJustifyIcon /></button>

                <label className='relative top-[3px] cursor-pointer' htmlFor="imgInput" onMouseDown={saveCaret}>
                    <ImgIcon />
                </label>
                <input
                    onChange={uploadImg}
                    className="hidden"
                    type="file"
                    id="imgInput"
                />
            </div>

            <div
                ref={editorRef}
                contentEditable={true}
                className={`max-w-7xl mx-auto h-[500px] p-2 rounded border border-slate-200 outline-0 overflow-auto ${styles.image}`}
                onInput={() => {
                    if (editorRef.current) {
                        const html = editorRef.current.innerHTML;
                        setContent(html);
                    }
                }}
            />
        </div>
    );
}
