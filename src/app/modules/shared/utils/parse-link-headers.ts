import { HttpHeaders } from "@angular/common/http";
import { Pagination } from "../interfaces/pagination";

export class ParseLinkHeaders{

    static parseHeaders(headers: HttpHeaders): Pagination {

        let linkHeaders = headers.get('Link');        


        if(!linkHeaders){
            return { hasNext: false, hasPrevious: false}
        }

        let hasNext = linkHeaders.search("next") > -1 ? true : false;
        let hasPrevious = linkHeaders.search("prev") > -1 ? true : false;

        return {
            hasNext: hasNext,
            hasPrevious: hasPrevious
        }


    }
}