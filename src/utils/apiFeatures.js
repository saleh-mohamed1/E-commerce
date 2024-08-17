





export class ApiFeature {
    constructor(mongoosequery,searchQuery){
        this.mongoosequery = mongoosequery
        this.searchQuery = searchQuery
    }


      //=============Pagination==================
    pagination(){
        let pageNumber = this.searchQuery.page * 1 || 1 
        if (this.searchQuery.page < 0) pageNumber = 1
        const limit = 4
        let skipPages = (parseInt(pageNumber - 1) * limit)
        this.mongoosequery.skip(skipPages).limit(limit)
        this.pageNumber = pageNumber
        return this
    }
        //=============FilterObject==================
    filter(){
        let filterObj = structuredClone(this.searchQuery)
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(gt|gte|lt|lte)/g,val=> `$${val}`)
        filterObj = JSON.parse(filterObj)
        let deleteForArraysFilter = ['page','search','sort','fields']
        deleteForArraysFilter.forEach(everyOne => delete filterObj[everyOne])
        
        this.mongoosequery.find(filterObj)
        return this
    }
        //=============Sort==================
    sort(){
        if (this.searchQuery.sort) {
            let sortBy = this.searchQuery.sort.split(',').join(' ')
            this.mongoosequery.sort(sortBy)        
        }    
        return this
    }
        //=============SelectedField==================
    selectField(){
        if (this.searchQuery.fields) {
            let selectedFields = this.searchQuery.fields.split(',').join(' ')
           this.mongoosequery.select(selectedFields)        
        }    
        return this
    }
    //=============Search==================
    search(){
        if (this.searchQuery.search) {     
            this.mongoosequery.find({
                $or:
                    [
                        {name:{$regex:this.searchQuery.search , $options:'i'}},
                        {title:{$regex:this.searchQuery.search , $options:'i'}},
                        {description:{$regex:this.searchQuery.search , $options:'i'}},
                    ]
            })        
        }    
        return this
    }
}