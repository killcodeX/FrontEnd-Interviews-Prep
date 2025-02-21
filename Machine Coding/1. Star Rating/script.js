class StarRating{
    constructor(){
        this.starCon = document.querySelector(".star-rating-container");
        this.title = document.querySelector(".title")
        this.ratings = Array.from(this.starCon.children)
        this.rating = 0
        this.init()
        this.handleMousein()
        this.handleMouseOut()
    }

    init(){
        for(let i = 0; i < this.ratings.length; i++){
            this.ratings[i].addEventListener("click", () => {
                this.rating = i+1
                this.setRating(i)
            })
        }
    }

    setRating(index){
        this.reset()
        for(let i = 0; i <= index; i++){
            this.ratings[i].classList.remove("fa-star-o")
            this.ratings[i].classList.add("fa-star")
        }
        this.title.innerText = `Current Rating ${this.rating}`
    }

    reset(){
        for(let i = 0; i < this.ratings.length; i++){
            this.ratings[i].classList.remove("fa-star")
            this.ratings[i].classList.add("fa-star-o")
        }
    }

    handleMousein(){
        for(let i = 0; i < this.ratings.length; i++){
            this.ratings[i].addEventListener("mouseenter", () => this.setRating(i))
        }
    }

    handleMouseOut(){
        for(let i = 0; i < this.ratings.length; i++){
            this.ratings[i].addEventListener("mouseleave", () => this.setRating(this.rating - 1))
        }
    }
}

new StarRating()