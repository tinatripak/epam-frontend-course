export default function findPrevDay(boxes, element, day) {
    boxes.forEach(box => {
        if(element.length >= 1){
            if(box.innerHTML === day){
                box.style.border = 'none';
            }
        }
    });
}