export const QuillModules = {
    toolbar: [
        [
            { header: '1' },
            { header: '2' },
            { header: [3, 4, 5, 6] },
            {
                font: [],
            },
        ],
        [{ size: ['small', 'medium', 'large'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'code-block'],
        ['clean'],
    ],
}

export const QuillFormats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'code-block',
]
