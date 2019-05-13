export class TestSetValidator{
    static testSetNameValidator(testSetName): any{
        // const EXPRESSION = /[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
        const EXPRESSION = /^[a-zA-Z0-9- ]*$/;
        if (EXPRESSION.test(testSetName.value)) {
            console.log("valid testset name");
            return null;
         }
         console.log("invalid testset name");
         return {
            invalidTestSetName: true
         };
    }    
}