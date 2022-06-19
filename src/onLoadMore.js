 export default class LoadBtn {
    constructor({selector, hidden = false}){
        this.refs = this.getRefs(selector);

        hidden && this.hide();
    }

    getRefs(selector){
        const refs = {};
        refs.loadBtn = document.querySelector(selector);
        refs.spiner = refs.loadBtn.querySelector('.spiner');
        refs.text = refs.loadBtn.querySelector('.load-btn_text');
        return refs;
    }

    show(){
        this.refs.loadBtn.classList.remove('is-hidden')
    }

    hide(){
        this.refs.loadBtn.classList.add('is-hidden')
    }

    able(){
        this.refs.loadBtn.disabled = false;
        this.refs.spiner.classList.remove('spinner-border')
        this.refs.text.textContent = 'Load more';
    }

    disable(){
        this.refs.loadBtn.disabled = true;
        this.refs.spiner.classList.add('spinner-border')
        this.refs.text.textContent = 'Loading...';
    }
}