#include <stdio.h>
#include <stdlib.h>
#include <string.h>
struct list_head {
    struct list_head *next, *prev;
};


#define LIST_POISON1	((void *)0xdeadbeef)
#define LIST_POISON2	((void *)0xbadacafe)


#define offsetof(TYPE, MEMBER)  ((size_t)&((TYPE *)0)->MEMBER)
//부모 구조체접근.
#define container_of(ptr, type, member) ({              \
    void *__mptr = (void *)(ptr);                   \
    ((type *)(__mptr - offsetof(type, member))); })

#define LIST_HEAD_INIT(name) { &(name), &(name) }

#define LIST_HEAD(name) \
	struct list_head name = LIST_HEAD_INIT(name)

static inline void INIT_LIST_HEAD(struct list_head *list)
{
	list->next = list;
	list->prev = list;
} 

static inline void __list_add(struct list_head *new,
			      struct list_head *prev,
			      struct list_head *next)
{
	next->prev = new;
	new->next = next;
	new->prev = prev;
	prev->next = new;
}

/**
 * list_add - add a new entry
 * @new: new entry to be added
 * @head: list head to add it after
 *
 * Insert a new entry after the specified head.
 * This is good for implementing stacks.
 */
static inline void list_add(struct list_head *new, struct list_head *head)
{
	__list_add(new, head, head->next);
}

LIST_HEAD(stack);

struct entry {
	struct list_head list;
	int data;
};

#define list_entry(ptr, type, member) \
	container_of(ptr, type, member)

/**
 * list_for_each	-	iterate over a list
 * @pos:	the &struct list_head to use as a loop cursor.
 * @head:	the head for your list.
 */
#define list_for_each(pos, head) \
	for (pos = (head)->next; pos != (head); pos = pos->next)

static inline int list_empty(const struct list_head *head)
{
	return head->next == head;
}

static inline void __list_del(struct list_head * prev, struct list_head * next)
{
	next->prev = prev;
	prev->next = next;
}

/**
 * list_del - deletes entry from list.
 * @entry: the element to delete from the list.
 * Note: list_empty() on entry does not return true after this, the entry is
 * in an undefined state.
 */
static inline void __list_del_entry(struct list_head *entry)
{
	__list_del(entry->prev, entry->next);
}

static inline void list_del(struct list_head *entry)
{
	__list_del_entry(entry);
	entry->next = LIST_POISON1;
	entry->prev = LIST_POISON2;
}

int main(void)
{
    for(int i=0;i<8;i++)
    {
        struct entry *new_entry = malloc(sizeof(struct entry));
        new_entry->data = i;
		INIT_LIST_HEAD(&new_entry->list);
		if(list_empty(&stack))
		{
			printf("empty\n");
			INIT_LIST_HEAD(&stack);
		}
        list_add(&(new_entry->list),&stack);
    }

	//stack에 push 완료.
	struct list_head *ptr;
	struct entry *node;
	//스택의 next를 없애기전에 여기있는 값을 구해야댐/
	struct entry *d = list_entry(stack.next,struct entry, list);
	printf("\n\n%d\n\n",d->data);
	list_del(stack.next); //스택에서 제일 위에꺼 삭제하는 코드.
	

	list_for_each(ptr,&stack){ //stack전체를 위에서 부터 아래로 내려가면서 확인하는 메크로 결과값 : 76543210
		node = list_entry(ptr,struct entry,list);
		printf("%d\n",node->data);
	}

    
}