class ApiFeatures {
    constructor(query , queryString){
        this.query = query;
        this.queryString = queryString;
    }

    search(){
        const keyword = this.queryString.keyword ? {
            name : {
                $regex :this.queryString.keyword,
                $options : "i",
            }
        } : {};
        this.query = this.query.find({...keyword}).clone();
        return this;
    }

    filter(){
        const queryCopy = {...this.queryString};
        //remove the some fields for category
        console.log("something",queryCopy);
        const removeFields = ["keyword" , "page" , "limit"];
        removeFields.forEach((key)=>{
            delete queryCopy[key];
        });
        let queryCopyString = JSON.stringify(queryCopy);
        queryCopyString = queryCopyString.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
        console.log(JSON.parse(queryCopyString));
        this.query = this.query.find(JSON.parse(queryCopyString)).clone();
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryString.page) || 1; 
        const skip = resultPerPage*(currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip).clone(); 
        return this;
    }
}



module.exports = ApiFeatures;