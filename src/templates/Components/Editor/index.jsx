import { useEffect, useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';



const LoadEditorDark = ({html,setHtml,setLoading}) => {
    const editorRef             = useRef(null);
    const [editor,setEditor]    = useState(<></>);
    useEffect(() => {
        setLoading(true);
        const TMCE = {};
        TMCE.apiKey = '5g4xxchrai4wtgywcyir7v6ofscpaidl5u7heiclghfaral6';
        TMCE.config = {
            height: 300,
            menubar: false,
            plugins: [
                'paste',
                'advlist','autolink',
                'lists','link','image','charmap','preview','searchreplace','visualblocks',
                'fullscreen','insertdatetime','table','wordcount','tinydrive','quickbars','visualchars','charmap','code'
            ],
            toolbar: 'preview fullscreen | pastetext | undo redo | casechange blocks | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist checklist outdent indent | removeformat visualchars charmap | image link table | code',
            quickbars_selection_toolbar: 'bold italic | charmap | quicklink blockquote',
            contextmenu: 'bold italic link charmap'
        };

        TMCE.config.skin = "oxide-dark";
        TMCE.config.content_css = "dark";

        setEditor(<Editor
            apiKey={TMCE.apiKey}
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={html}
            placeholder="Passage content"
            init={TMCE.config}
            onEditorChange={(content) => setHtml(content)}
        />);
        setLoading(false);
            
    },[]);
    return (<>
        {editor}
    </>)
}

const LoadEditorLight = ({html,setHtml,setLoading}) => {
    const editorRef             = useRef(null);
    const [editor,setEditor]    = useState(<></>);
    useEffect(() => {
        console.info("[LOADING] ",true);
        setLoading(true);
        const TMCE = {};
        TMCE.apiKey = '5g4xxchrai4wtgywcyir7v6ofscpaidl5u7heiclghfaral6';
        TMCE.config = {
            height: 300,
            menubar: false,
            
            plugins: [
                'paste',
                'advlist','autolink',
                'lists','link','image','charmap','preview','searchreplace','visualblocks',
                'fullscreen','insertdatetime','table','wordcount','tinydrive','quickbars','visualchars','charmap','code'
                
            ],
            toolbar: 'preview fullscreen | pastetext | undo redo | casechange blocks | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist checklist outdent indent | removeformat visualchars charmap | image link table | code',
            quickbars_selection_toolbar: 'bold italic | charmap | quicklink blockquote',
            contextmenu: 'bold italic link charmap'
        };

        setEditor(<Editor
            apiKey={TMCE.apiKey}
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={html}
            placeholder="Passage content"
            init={TMCE.config}
            onEditorChange={(content) => setHtml(content)}
        />);

        setLoading(false);
        console.info("[LOADING] ",false);
            
    },[]);
    return (<>
        {editor}
    </>)
}

export { LoadEditorDark, LoadEditorLight };